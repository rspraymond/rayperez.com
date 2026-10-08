provider "aws" {
  region                   = "us-east-2"
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "s3-deployer"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "www.rayperez.com"
}

resource "aws_s3_bucket_public_access_block" "access_block" {
  bucket                  = aws_s3_bucket.bucket.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

locals {
  resume_manifest = jsondecode(file("${path.module}/../dist/resume-manifest.json"))

  # Legacy WordPress (or other) URL path prefixes that should 301 to the site home.
  # Use S3 object key style: no leading slash. Prefer a trailing slash for old post permalinks.
  # Use ReplaceKeyPrefixWith = "" (not ReplaceKeyWith = "index.html") so the Location is / not /index.html (SPA route).
  # If both .../slug and .../slug/ appear in the wild, add two entries or one shorter prefix that covers the subtree you want to redirect.
  legacy_home_redirect_prefixes = [
    "2011/10/painted-the-valve-cover-on-my-1996-toyota-corolla/",
  ]

  legacy_home_redirect_rules = [
    for prefix in local.legacy_home_redirect_prefixes : {
      Condition = {
        KeyPrefixEquals = prefix
      }
      Redirect = {
        HttpRedirectCode     = "301"
        HostName             = "www.rayperez.com"
        Protocol             = "https"
        ReplaceKeyPrefixWith = ""
      }
    }
  ]

  resume_redirect_rule = {
    Condition = {
      KeyPrefixEquals = "raymond-perez-software-engineer-resume.pdf"
    }
    Redirect = {
      HostName       = "www.rayperez.com"
      Protocol       = "https"
      ReplaceKeyWith = "assets/${local.resume_manifest.hashedFilename}"
    }
  }

  # Trailing-slash redirects for content URLs live in Cloudflare, not S3. S3 prefix rules
  # would also match deeper paths such as /why-nestjs/extra and send them to the article.

  website_routing_rules = jsonencode(concat(
    [local.resume_redirect_rule],
    local.legacy_home_redirect_rules,
  ))
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }

  # Static 404.html avoids serving index.html for missing keys (soft 404 for crawlers).
  error_document {
    key = "404.html"
  }

  routing_rules = local.website_routing_rules
}

data "aws_iam_policy_document" "website_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.website_bucket_policy.json
}
