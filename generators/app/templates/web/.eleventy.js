const { DateTime } = require("luxon");
const util = require("util");
const CleanCSS = require("clean-css");
const sanityImage = require("eleventy-plugin-sanity-image");
const sanityClient = require("./utils/sanityClient");
const urlFor = require("./utils/imageUrl");
const Dyve11ty = require("@dyve/11ty-toolkit");
const debug = require("debug")("arby");

module.exports = function (eleventyConfig) {
  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("debug", function (value) {
    debug("debug filter %o", util.inspect(value, { compact: false }));
    return util.inspect(value, { compact: false });
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toDateString();
  });

  eleventyConfig.addFilter("urlFor", (image) => {
    return urlFor(image);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  };
  eleventyConfig.addPlugin(Dyve11ty.plugins.minifyHtml);
  eleventyConfig.addPlugin(Dyve11ty.plugins.cleanHtml);

  eleventyConfig.addPlugin(Dyve11ty.plugins.postcss, {
    outDir: "_site/styles",
    srcDir: "styles",
    tailwindcss: {
      src: "styles/tailwind.css",
      dest: "_site/styles",
    },
    exclude: "styles/import/**/*",
  });

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));

  eleventyConfig.addFilter("markdownify", function (value) {
    const md = new markdownIt(options);
    return md.render(value);
  });
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./styles");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addPlugin(sanityImage, {
    client: sanityClient, // This is your Sanity connection object
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
