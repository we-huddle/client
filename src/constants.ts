export const TOKEN_KEY = 'token';
export type APIConfig = {
  BASE: string;
  TOKEN?: string;
}

export const API: APIConfig = {
  BASE: process.env.NODE_ENV === "production"? 'https://lionfish-app-m7suk.ondigitalocean.app' : 'http://localhost:8080',
  TOKEN: undefined,
};
