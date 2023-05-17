import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        proxy: {
            "/api": {
                target: "http://localhost:5000/api",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace("/api", ""),
            },
        },
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@pages": path.resolve(__dirname, "src/pages"),
        },
    },
});
