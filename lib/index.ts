import { AuthorizationDecisionEndpoint } from './ts-oauth-server/api/AuthorizationDecisionEndpoint';
import { AuthorizationEndpoint } from './ts-oauth-server/api/AuthorizationEndpoint';
import { PushedAuthReqEndpoint } from './ts-oauth-server/api/PushedAuthReqEndpoint';
import { TokenEndpoint } from './ts-oauth-server/api/TokenEndpoint';
import { loadEnv } from './util/EnvLoader';
export const add = (x: number, y: number): number => {
  return x + y;
};
export * from './util/session';
export {
  AuthorizationDecisionEndpoint,
  AuthorizationEndpoint,
  PushedAuthReqEndpoint,
  TokenEndpoint,
  loadEnv,
};
