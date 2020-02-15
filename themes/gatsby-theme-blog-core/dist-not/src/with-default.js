"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefault = (themeOptions) => {
    const { basePath = '/', blogPath = '/blog', tagsPath = '/tags', assetsPath = 'contents/assets', postsPath = 'contents/posts', templatesPath = 'src/templates', externalLinks = [], navigations = [], showLineNumbers = true, gatsbyRemarkPlugins = [], mdx = true, ...rest } = themeOptions;
    return {
        basePath,
        blogPath,
        assetsPath,
        postsPath,
        templatesPath,
        tagsPath,
        externalLinks,
        navigations,
        showLineNumbers,
        gatsbyRemarkPlugins,
        mdx,
        ...rest
    };
};
exports.default = exports.withDefault;
//# sourceMappingURL=with-default.js.map