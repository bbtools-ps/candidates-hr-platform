import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: false,
    semi: true,
    trailingComma: "es5",
    ignorePatterns: [],
  },
  lint: {
    plugins: ["typescript", "react", "oxc", "jsx-a11y"],
    rules: {
      "eslint/no-shadow": "off",
      "eslint/no-underscore-dangle": "off",
      "react/react-in-jsx-scope": "off",
      "react/rules-of-hooks": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/no-explicit-any": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    categories: {
      correctness: "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  staged: {
    "*": "vp check --fix",
  },
  plugins: lazyPlugins(() => [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ]),
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    pool: "vmThreads",
  },
});
