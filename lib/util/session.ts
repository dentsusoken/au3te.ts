/**
 * Session interface
 * implement this interface to fit your own environment
 */
export interface Session {
  get: (key: string) => Promise<unknown | undefined>;
  set: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

export type SessionRowValue = { expireAt: number } & Record<string, unknown>;
export type SessionValue = string;
export type generateExpireTimeParams = {
  hour?: number;
  minute?: number;
  second?: number;
};

export const SESSION_STORE_ID = '_Session';
export const COOKIE_ID = '_sessionId';

const generateDefaultExpireTime = () => {
  return Date.now() + 60 * 60 * 1000;
};

const generateCustomExpireTime = ({
  hour = 0,
  minute = 0,
  second = 0,
}: generateExpireTimeParams) => {
  return (
    Date.now() + hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000
  );
};

const generateRandomString = (digit: number) => {
  return Math.random()
    .toString(16)
    .substring(2, digit + 2);
};

const generateUUID = () => {
  return `${generateRandomString(8)}-${generateRandomString(
    4
  )}-4${generateRandomString(3)}-${generateRandomString(
    4
  )}-${generateRandomString(12)}`;
};

export const SessionUtils = {
  toJson: (obj: Record<string, unknown>) => {
    return JSON.stringify(obj);
  },
  fromJson: (json: string): unknown => {
    return JSON.parse(json);
  },
  generateSessionId: () => {
    return generateUUID();
  },
  generateExpireTime: (params?: generateExpireTimeParams) => {
    return !params || Object.keys(params).length === 0
      ? generateDefaultExpireTime()
      : generateCustomExpireTime({
          hour: params.hour,
          minute: params.minute,
          second: params.second,
        });
  },
  /**
   * Check if the session is expired
   * If session is expired, return true
   * Otherwise, return false
   *
   * @param expireAt
   * @returns boolean
   */
  isExpired: (expireAt: number) => {
    return Date.now() > expireAt;
  },
};
