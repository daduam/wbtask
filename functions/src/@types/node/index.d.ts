declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_APPLICATION_CREDENTIALS: string;
      IDENTITY_TOOLKIT_BASE_URL: string;
      WEB_API_KEY: string;
    }
  }
}

export {};
