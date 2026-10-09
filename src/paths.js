export const appBasePath = window.__APP_BASE_PATH__ || '';

export function appPath(path) {
  return `${appBasePath}/${path.replace(/^\/+/, '')}`;
}
