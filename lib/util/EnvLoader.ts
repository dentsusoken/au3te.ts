import * as process from 'node:process';
const ENV_IDENTIFERS = [
  'API_BASE_URL',
  'API_VERSION',
  'API_KEY',
  'ACCESS_TOKEN',
];
/**
 * Load environment variables.
 * "process" module is polyfilled by vite-plugin-node.
 * However, Cloudflare Workers does not use polyfilled module.
 * Thus, need to load environment variables manually.
 * This is temporary operation.
 * TODO Find out the way to load environment variables in Cloudflare Workers.
 * @param env Environment variables to load.
 */
export function loadEnv(env?: Record<string, unknown>) {
  // Skip if no environment variables.
  if (!env) return;

  ENV_IDENTIFERS.forEach((key) => {
    // Skip if already set.
    if (process.env[key]) return;
    // Skip if value is empty.
    const value = env[key];
    if (!value) return;

    if (typeof value === 'object') {
      loadEnv(value as Record<string, unknown>);
    } else if (typeof value === 'string') {
      process.env[key] = value;
    } else {
      process.env[key] = value.toString();
    }
  });
}
