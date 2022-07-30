export const TOKEN_KEY = 'token';
export type APIConfig = {
  BASE: string;
  TOKEN?: string;
}

export const API: APIConfig = {
  BASE: 'http://lionfish-app-m7suk.ondigitalocean.app/',
  // Uncomment to work on local set up, make sure this is set to the correct base url before merging PRs to master
  // BASE: 'http://localhost:8080/',
  TOKEN: undefined,
};
