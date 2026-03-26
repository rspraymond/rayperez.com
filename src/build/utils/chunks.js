/** Matches only the `react` and `react-dom` packages, not `react-router`, `@emotion/react`, etc. */
export var isReactCoreVendor = function (id) {
    return /[\\/]node_modules[\\/](?:react[\\/]|react-dom[\\/])/.test(id)
}
export var chunkMatchers = [
    {
        matcher: function (id) {
            return (
                id.includes('node_modules/@mui/material/') ||
                id.includes('node_modules/@emotion/react/') ||
                id.includes('node_modules/@emotion/styled/')
            )
        },
        name: 'mui-core',
    },
    {
        matcher: function (id) {
            return id.includes('node_modules/@mui/icons-material/')
        },
        name: 'mui-icons',
    },
    {
        matcher: function (id) {
            return (
                id.includes('node_modules/react-router-dom/') ||
                id.includes('node_modules/react-router/') ||
                id.includes('node_modules/history/')
            )
        },
        name: 'react-router',
    },
    {
        matcher: function (id) {
            return id.includes('node_modules/react-syntax-highlighter/')
        },
        name: 'syntax-highlighter',
    },
    {
        matcher: function (id) {
            return id.includes('node_modules/marked/')
        },
        name: 'marked',
    },
    {
        matcher: function (id) {
            return (
                id.includes('node_modules/react-query/') ||
                id.includes('node_modules/react-schemaorg/') ||
                id.includes('node_modules/schema-dts/')
            )
        },
        name: 'data',
    },
    {
        matcher: function (id) {
            return (
                id.includes('node_modules/react-helmet-async/') ||
                id.includes('node_modules/react-helmet/')
            )
        },
        name: 'ui-utils',
    },
    {
        matcher: isReactCoreVendor,
        name: 'react-vendor',
    },
]
export var manualChunkForId = function (id) {
    for (var _i = 0, chunkMatchers_1 = chunkMatchers; _i < chunkMatchers_1.length; _i++) {
        var _a = chunkMatchers_1[_i],
            matcher = _a.matcher,
            name_1 = _a.name
        if (matcher(id)) {
            return name_1
        }
    }
}
