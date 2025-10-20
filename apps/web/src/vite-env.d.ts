/// <reference types="vite/client" />

//  add your custom env vars here so they're typed:
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
