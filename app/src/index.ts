import { KVNamespace } from '@cloudflare/workers-types';
import { PushedAuthReqEndpoint, loadEnv } from 'au3te';
import { Hono } from 'hono';
import { KVSession } from './util/session';

type Bindings = {
  _Session: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.all('*', (c, next) => {
  loadEnv(c.env);
  return next();
});

app.get('/', async (c) => {
  return c.text('Hello, World!');
});

app.get('/session/set', async (c) => {
  const session = await KVSession(c);
  const json = JSON.parse(c.req.query('session') || '{}');
  await session.set('params', json);
  return c.text(c.req.query('session') || '');
});

app.get('/session/get', async (c) => {
  const session = await KVSession(c);
  const value = await session.get('params');
  console.log('value :>> ', value);
  return c.text(typeof value === 'string' ? value : JSON.stringify(value));
});

app.post('/api/par', (c) => {
  const endpoint = new PushedAuthReqEndpoint();
  return endpoint.post(c.req.raw);
});

export default {
  fetch: app.fetch,
};
