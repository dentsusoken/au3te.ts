import PushedAuthReqEndpoint from './ts-oauth-server/api/PushedAuthReqEndpoint';
import { loadEnv } from './util/EnvLoader.ts';
export const add = (x: number, y: number): number => {
  return x + y;
};

export { PushedAuthReqEndpoint, loadEnv };
