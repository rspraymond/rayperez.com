export var chunkMatchers = [
    {
        matcher: function (id) { return id.includes('react') || id.includes('react-dom'); },
        name: 'react-vendor',
    },
    {
        matcher: function (id) {
            return id.includes('react-router-dom') ||
                id.includes('history') ||
                id.includes('react-router');
        },
        name: 'react-router',
    },
    {
        matcher: function (id) {
            return id.includes('@mui/material') ||
                id.includes('@emotion/react') ||
                id.includes('@emotion/styled');
        },
        name: 'mui-core',
    },
    {
        matcher: function (id) { return id.includes('@mui/icons-material'); },
        name: 'mui-icons',
    },
    {
        matcher: function (id) { return id.includes('react-syntax-highlighter'); },
        name: 'syntax-highlighter',
    },
    {
        matcher: function (id) { return id.includes('marked'); },
        name: 'marked',
    },
    {
        matcher: function (id) {
            return id.includes('react-query') ||
                id.includes('react-schemaorg') ||
                id.includes('schema-dts');
        },
        name: 'data',
    },
    {
        matcher: function (id) { return id.includes('react-helmet'); },
        name: 'ui-utils',
    },
];
export var manualChunkForId = function (id) {
    for (var _i = 0, chunkMatchers_1 = chunkMatchers; _i < chunkMatchers_1.length; _i++) {
        var _a = chunkMatchers_1[_i], matcher = _a.matcher, name_1 = _a.name;
        if (matcher(id)) {
            return name_1;
        }
    }
};
