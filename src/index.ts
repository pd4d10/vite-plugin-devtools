import { IndexHtmlTransformResult, Plugin, ConfigEnv } from "vite";

export interface VitePluginDevtoolsOptions {
  /**
   * https://github.com/Tencent/vConsole
   */
  vconsole?: boolean | ((env: ConfigEnv) => boolean);
  /**
   * https://github.com/liriliri/eruda
   */
  eruda?: boolean | ((env: ConfigEnv) => boolean);
}

export default function vitePluginDevtools({
  vconsole = false,
  eruda = false,
}: VitePluginDevtoolsOptions): Plugin {
  let env: ConfigEnv;

  return {
    name: "vite-plugin-devtools",
    config(_, e) {
      env = e;
    },
    transformIndexHtml() {
      if (typeof vconsole === "function") {
        vconsole = vconsole(env);
      }
      if (typeof eruda === "function") {
        eruda = eruda(env);
      }

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
