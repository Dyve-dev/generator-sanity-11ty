const dev = process.env.NODE_ENV === "development";

module.exports = {
  purge: {
    enabled: !dev,
    mode: "layers",
    // content: ["_site/**/*.html"],
    content: ["./**/*.njk"],
    options: {
      safelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
        change: "transparent",
      },
    },
  },
  variants: {},
  plugins: [],
};
