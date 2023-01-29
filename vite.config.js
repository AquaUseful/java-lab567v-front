import { resolve } from "path";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
    root: resolve(__dirname, "src"),
    resolve: {
        alias: {
            "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
            "~bootstrap-icons": resolve(__dirname, "node_modules/bootstrap-icons")
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                login: resolve(__dirname, "src/login.html"),
                signup: resolve(__dirname, "src/signup.html"),
                cabinet: resolve(__dirname, "src/profile.html")
            }
        },
        outDir: "../dist",
        emptyOutDir: true
    },
    plugins: [
        ViteMinifyPlugin({
            collapseWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        })
    ]
});