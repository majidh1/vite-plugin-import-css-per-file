import type { PluginOption } from 'vite';

type importCssPerFileOptions = {
  include?: string;
  exclude?: string;
}

export default function (option?: importCssPerFileOptions): PluginOption
