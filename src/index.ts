import { IndexHtmlTransformResult, Plugin } from "vite";

export interface VitePluginDevtoolsOptions {
  /**
   * https://github.com/Tencent/vConsole
   */
  vconsole?: boolean;
  /**
   * https://github.com/liriliri/eruda
   */
  eruda?: boolean;
}

export default function vitePluginDevtools({
  vconsole,
  eruda,
}: VitePluginDevtoolsOptions): Plugin {
  let build = true;

  return {
    name: "vite-plugin-devtools",
    configResolved({ command }) {
      build = command === "build";
    },
    transformIndexHtml() {
      if (build) return;

      return [
        ...(vconsole
          ? [
              { tag: "script", attrs: { src: "https://unpkg.com/vconsole" } },
              { tag: "script", children: "new VConsole()" },
            ]
          : []),
        ...(eruda
          ? [
              { tag: "script", attrs: { src: "https://unpkg.com/eruda" } },
              { tag: "script", children: "eruda.init()" },
            ]
          : []),
      ] satisfies IndexHtmlTransformResult;
    },
  };
}
