import { PushedAuthReqEndpoint, loadEnv } from 'au3te';
import { Hono } from 'hono';

const app = new Hono();

app.all('*', (c, next) => {
  loadEnv(c.env);
  return next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/par', (c) => {
  const endpoint = new PushedAuthReqEndpoint();
  return endpoint.post(c.req.raw);
});

export default app;
