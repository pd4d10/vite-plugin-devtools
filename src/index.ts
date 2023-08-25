import { IndexHtmlTransformResult, Plugin } from "vite";

export default function vitePluginDevtools(): Plugin {
  let serve = false;

  return {
    name: "vite-plugin-devtools",
    configResolved({ command }) {
      serve = command === "serve";
    },
    transformIndexHtml() {
      if (serve) {
        return [
          { tag: "script", attrs: { src: "https://unpkg.com/vconsole" } },
          { tag: "script", children: "new VConsole()" },
          { tag: "script", attrs: { src: "https://unpkg.com/eruda" } },
          { tag: "script", children: "eruda.init()" },
        ] satisfies IndexHtmlTransformResult;
      }
    },
  };
}
