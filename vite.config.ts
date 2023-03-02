import { resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteSvgr()],
    resolve: {
        alias: [
            {
                find: "@assets",
                replacement: resolve(__dirname, "src", "assets"),
            },
            {
                find: "@components",
                replacement: resolve(__dirname, "src", "components"),
            },
        ],
    },
});
