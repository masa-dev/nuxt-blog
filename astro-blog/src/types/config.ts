export interface Config {
  apiUrl: string;
  apiKey: string;
  _app: {
    basePath?: string;
    assetsPath?: string;
    cdnURL?: string;
  };
}
