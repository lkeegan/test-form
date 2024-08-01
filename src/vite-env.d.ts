/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BUILD_DATETIME: string
    readonly VITE_BUILD_COMMIT: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}