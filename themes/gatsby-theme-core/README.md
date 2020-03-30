# @hpprc/gatsby-theme-core

Minimal core configurations and functions for Gatsby site.

- absolute import
- TypeScript
- ServiceWorker
- PWA
- robot.txt
- advanced sitemap
- Google Analytics

## Example

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@hpprc/gatsby-theme-core`,
      options: {
        siteTitle: 'hpp core',
        siteUrl: 'https://hpprc.com',
        siteDescription: 'core functions for Gatsby site',
        iconPath: './contents/assets/icon.png',
        googleAnalyticsTrackingId: 'UA-XXXXXXXXX-X',
        backgroundColor: '#ffffff',
        themeColor: '#09090f'
      }
    }
  ]
};
```
