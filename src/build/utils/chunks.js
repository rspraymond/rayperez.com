/** Matches only the `react` and `react-dom` packages, not `react-router`, `@emotion/react`, etc. */
export var isReactCoreVendor = function (id) {
    return /[\\/]node_modules[\\/](?:react[\\/]|react-dom[\\/])/.test(id)
}
/**
 * React, React DOM, MUI core, Emotion, and shared @mui packages must share one chunk.
 * Splitting them produced a react-vendor ↔ mui-core import cycle and TDZ errors in production.
 */
export var isReactMuiVendorChunk = function (id) {
    return (
        isReactCoreVendor(id) ||
        id.includes('node_modules/@mui/material/') ||
        id.includes('node_modules/@mui/icons-material/') ||
        id.includes('node_modules/@emotion/react/') ||
        id.includes('node_modules/@emotion/styled/') ||
        id.includes('node_modules/@mui/system/') ||
        id.includes('node_modules/@mui/utils/') ||
        id.includes('node_modules/@mui/styled-engine/') ||
        id.includes('node_modules/@mui/base/')
    )
}
export var chunkMatchers = [
    {
        matcher: isReactMuiVendorChunk,
        name: 'react-mui-vendor',
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
                id.includes('node_modules/react-helmet-async/') ||
                id.includes('node_modules/react-helmet/')
            )
        },
        name: 'ui-utils',
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
