import { KVNamespace } from '@cloudflare/workers-types';
import {
  COOKIE_ID,
  SESSION_STORE_ID,
  Session,
  SessionRowValue,
  SessionUtils,
} from 'au3te';
import type { Input } from 'hono';
import { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

type Bindings = {
  _Session: KVNamespace;
};

export const loadData = async (
  c: Context<{ Bindings: Bindings }, string, Input>,
  sessionId: string
): Promise<SessionRowValue | undefined> => {
  try {
    const json = await c.env[SESSION_STORE_ID].get(sessionId);
    if (!json) return;
    const data = SessionUtils.fromJson(json);
    if (!data || typeof data !== 'object') {
      throw new Error('Data is not an object');
    }
    if (!Object.hasOwn(data, 'expireAt')) {
      throw new Error('data is not a SessionRowValue object');
    }
    return data as SessionRowValue;
  } catch (e) {
    // ignore
    return;
  }
};

export const setExpiration = async (
  c: Context,
  sessionId: string,
  data: SessionRowValue
) => {
  const expireAt = SessionUtils.generateExpireTime();
  setCookie(c, COOKIE_ID, sessionId, {
    path: '/',
    httpOnly: true,
    expires: new Date(expireAt),
  });
  await c.env[SESSION_STORE_ID].put(
    sessionId,
    SessionUtils.toJson({ ...data, expireAt } as SessionRowValue)
  );
};

/**
 * @param c Context<{ Bindings: Bindings }, string, Input>
 * @param sessionId string
 * @returns session Session
 */
export const KVSession = async (
  c: Context<{ Bindings: Bindings }, string, Input>
): Promise<Session> => {
  const sessionId = getCookie(c, COOKIE_ID) || SessionUtils.generateSessionId();
  const data = SessionUtils.fromJson(
    (await c.env[SESSION_STORE_ID].get(sessionId)) || '{}'
  ) as SessionRowValue;

  await setExpiration(c, sessionId, data);

  return {
    get: async (key) => {
      const data = await loadData(c, sessionId);
      if (!data) {
        return;
      }
      return data[key];
    },
    set: async (key, value) => {
      const data = await loadData(c, sessionId);
      if (!data) {
        throw new Error("Session data doesn't exist");
      }
      data[key] = value;
      await c.env[SESSION_STORE_ID].put(sessionId, SessionUtils.toJson(data));
    },
    delete: async (key) => {
      delete data[key];
      await c.env[SESSION_STORE_ID].put(sessionId, SessionUtils.toJson(data));
    },
    clear: async () => {
      await c.env[SESSION_STORE_ID].delete(sessionId);
    },
  };
};
