import { describe, expect, it, vitest } from 'vitest';
import { AuthleteApi } from '../au3te-ts-common/api/AuthleteApi';
import { AuthorizationIssueResponse } from '../au3te-ts-common/dto/AuthorizationIssueResponse';
import { AuthorizationResponse } from '../au3te-ts-common/dto/AuthorizationResponse';
import { PushedAuthReqResponse } from '../au3te-ts-common/dto/PushedAuthReqResponse';
import { URLCoder } from '../au3te-ts-common/web/URLCoder';
import { AuthleteApiCaller } from './AuthleteApiCaller';

describe('AuthleteApiCaller', () => {
  describe('callPushedAuthReq', () => {
    it('should call pushAuthorizationRequest with correct parameters', async () => {
      // @ts-expect-error Mocking
      const mockApi: AuthleteApi = {
        pushAuthorizationRequest: vitest
          .fn()
          .mockResolvedValue(new PushedAuthReqResponse()),
        authorization: vitest
          .fn()
          .mockResolvedValue(new AuthorizationResponse()),
        authorizationIssue: vitest
          .fn()
          .mockResolvedValue(new AuthorizationIssueResponse()),
      };
      const caller = new AuthleteApiCaller(mockApi);
      const parameters = { param1: 'value1', param2: 'value2' };
      const clientId = 'clientId';
      const clientSecret = 'clientSecret';
      const clientCertificate = 'clientCertificate';
      const clientCertificatePath = ['path1', 'path2'];
      const dpop = 'dpop';
      const htm = 'htm';
      const htu = 'htu';

      // Act
      await caller.callPushedAuthReq(
        parameters,
        clientId,
        clientSecret,
        clientCertificate,
        clientCertificatePath,
        dpop,
        htm,
        htu
      );

      // Assert
      expect(mockApi.pushAuthorizationRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          parameters: URLCoder.formUrlEncode(parameters)!,
          clientId,
          clientSecret,
          clientCertificate,
          clientCertificatePath,
          dpop,
          htm,
          htu,
        })
      );
    });

    it('should return the response from pushAuthorizationRequest', async () => {
      // Arrange
      const mockResponse = new PushedAuthReqResponse();
      // @ts-expect-error - Mocking
      const mockApi = {
        pushAuthorizationRequest: vitest
          .fn()
          .mockResolvedValue(new PushedAuthReqResponse()),
      } as AuthleteApi;
      const caller = new AuthleteApiCaller(mockApi);

      // Act
      const response = await caller.callPushedAuthReq();

      // Assert
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if pushAuthorizationRequest throws an error', async () => {
      // Arrange
      const mockError = new Error('API call failed');
      // @ts-expect-error Mocking
      const mockApi: AuthleteApi = {
        pushAuthorizationRequest: vitest.fn().mockRejectedValue(mockError),
        authorization: vitest
          .fn()
          .mockResolvedValue(new AuthorizationResponse()),
        authorizationIssue: vitest
          .fn()
          .mockResolvedValue(new AuthorizationIssueResponse()),
      };
      const caller = new AuthleteApiCaller(mockApi);
      const reg = new RegExp(
        `Authlete /api/.* API failed: ${mockError.message}`
      );

      // Act & Assert
      await expect(caller.callPushedAuthReq()).rejects.toThrowError(reg);
    });
  });
});
