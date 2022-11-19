import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
    target: "http://localhost:9000",
    changeOrigin: true,
    pathRewrite: { "^/api": "/" },
});

export const config = {
    api: {
        bodyParser: false, // enable POST requests
        externalResolver: true, // hide warning message
    },
};
