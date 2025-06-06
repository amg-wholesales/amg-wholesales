// // import { dirname } from "path";
// // import { fileURLToPath } from "url";
// // import { FlatCompat } from "@eslint/eslintrc";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);

// // const compat = new FlatCompat({
// //   baseDirectory: __dirname,
// // });

// // const eslintConfig = [
// //   ...compat.extends("next/core-web-vitals", "next/typescript"),
// // ];

// // export default eslintConfig;
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     rules: {
//       "@typescript-eslint/no-unused-vars": "off",
//       "react-hooks/exhaustive-deps": "warn",
//       "@next/next/no-img-element": "off",
//       "react/no-unescaped-entities": "off",
//       "@next/next/no-html-link-for-pages": "off",
//     },
//   },
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
      "no-var": "off", // ✅ Allows 'var' in prisma.ts
      "prefer-const": "off", // ✅ Disables 'prefer-const' rule
      "@typescript-eslint/no-explicit-any": "off", // ✅ Allows 'any' type
    },
  },
];

export default eslintConfig;

