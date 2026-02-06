import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: isProd,    // ❌ removes console.log in prod
          drop_debugger: isProd,  // ❌ removes debugger in prod
        },
      },
      sourcemap: !isProd, // no source maps in prod (more secure)
    },

    define: {
      __DEV__: !isProd,
    },
  };
});
