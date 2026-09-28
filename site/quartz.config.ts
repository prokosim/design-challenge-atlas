import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// Design Challenge Atlas — Quartz configuration.
// Values come from atlas.config.json via environment variables set by scripts/build-site.mjs.
const config: QuartzConfig = {
  configuration: {
    pageTitle: process.env.ATLAS_TITLE ?? "Design Challenge Atlas",
    pageTitleSuffix: " · Design Challenge Atlas",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: process.env.ATLAS_BASE_URL ?? "example.github.io/design-challenge-atlas",
    ignorePatterns: ["private", "Templates", ".obsidian", ".trash"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Source Sans 3",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fbfaf7",
          lightgray: "#e4e2dc",
          gray: "#a9a69d",
          darkgray: "#45433e",
          dark: "#1f1e1b",
          secondary: "#1f5f8b",
          tertiary: "#c2703d",
          highlight: "rgba(31, 95, 139, 0.10)",
          textHighlight: "#ffe56688",
        },
        darkMode: {
          light: "#17181a",
          lightgray: "#34363a",
          gray: "#6d6f74",
          darkgray: "#d6d6d3",
          dark: "#efeeea",
          secondary: "#7fb3d9",
          tertiary: "#e39a67",
          highlight: "rgba(127, 179, 217, 0.12)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: false }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
