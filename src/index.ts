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
  return {
    name: "vite-plugin-devtools",
    transformIndexHtml() {
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
