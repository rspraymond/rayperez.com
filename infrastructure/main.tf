provider "aws" {
  region                  = "us-east-2"
  shared_credentials_files = ["~/.aws/credentials"]
  profile                 = "s3-deployer"
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
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  routing_rules = <<EOF
[
  {
    "Condition": {
      "KeyPrefixEquals": "raymond-perez-software-engineer-resume.pdf"
    },
    "Redirect": {
      "Protocol": "https",
      "HostName": "www.rayperez.com",
      "ReplaceKeyWith": "assets/${local.resume_manifest.hashedFilename}"
    }
  },
  {
    "Condition": {
      "HttpErrorCodeReturnedEquals": "404"
    },
    "Redirect": {
      "Protocol": "https",
      "HostName": "www.rayperez.com",
      "ReplaceKeyPrefixWith": "#!/"
    }
  },
  {
    "Condition": {
      "HttpErrorCodeReturnedEquals": "403"
    },
    "Redirect": {
      "Protocol": "https",
      "HostName": "www.rayperez.com",
      "ReplaceKeyPrefixWith": "#!/"
    }
  }
]
EOF
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
