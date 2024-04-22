// import { PushedAuthReqEndpoint } from 'au3te';
import { Hono } from 'hono';
import PushedAuthReqEndpoint from '../../lib/ts-oauth-server/api/PushedAuthReqEndpoint';
// import { env } from 'node:process';
import * as process from 'node:process';

type Bindings = {
  BASE_URL: string;
  API_VERSION: string;
  API_KEY: string;
  ACCESS_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.all('*', async (c, next) => {
  process.env['BASE_URL'] = c.env['BASE_URL'];
  process.env['API_VERSION'] = c.env['API_VERSION'];
  process.env['API_KEY'] = c.env['API_KEY'];
  process.env['ACCESS_TOKEN'] = c.env['ACCESS_TOKEN'];
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  await next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/par', (c) => {
  console.log('/par >>> ', process.env);
  const endpoint = new PushedAuthReqEndpoint();
  return endpoint.post(c.req.raw);
});

export default app;
