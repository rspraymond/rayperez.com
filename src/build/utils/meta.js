export var escapeHtml = function (value) {
    return (value !== null && value !== void 0 ? value : '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};
export var buildMetaTags = function (values) {
    var title = values.title, description = values.description, keywords = values.keywords, image = values.image, url = values.url, type = values.type, siteName = values.siteName, twitterCreator = values.twitterCreator;
    return "\n    <title>".concat(escapeHtml(title), "</title>\n    <meta name=\"description\" content=\"").concat(escapeHtml(description), "\" />\n    <meta name=\"keywords\" content=\"").concat(escapeHtml(keywords), "\" />\n    <meta property=\"og:title\" content=\"").concat(escapeHtml(title), "\" />\n    <meta property=\"og:description\" content=\"").concat(escapeHtml(description), "\" />\n    <meta property=\"og:image\" content=\"").concat(escapeHtml(image), "\" />\n    <meta property=\"og:url\" content=\"").concat(escapeHtml(url), "\" />\n    <meta property=\"og:type\" content=\"").concat(escapeHtml(type), "\" />\n    <meta property=\"og:site_name\" content=\"").concat(escapeHtml(siteName), "\" />\n    <meta property=\"twitter:card\" content=\"summary_large_image\" />\n    <meta property=\"twitter:title\" content=\"").concat(escapeHtml(title), "\" />\n    <meta property=\"twitter:description\" content=\"").concat(escapeHtml(description), "\" />\n    <meta property=\"twitter:image\" content=\"").concat(escapeHtml(image), "\" />\n    ").concat(twitterCreator ? "<meta property=\"twitter:creator\" content=\"".concat(escapeHtml(twitterCreator), "\" />") : '', "\n  ");
};
