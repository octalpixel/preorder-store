const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        newNextLinkBehavior: true,
    },
    images: {
        // loader: "imgix",
        // path: "https://refine-store.imgix.net/",
        domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", 'links.papareact.com'],
    },
});
