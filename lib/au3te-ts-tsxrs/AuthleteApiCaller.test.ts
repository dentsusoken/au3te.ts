import { describe, expect, it, vitest } from 'vitest';
import PushedAuthReqResponse from '../au3te-ts-common/dto/PushedAuthReqResponse';
import AuthleteApiCaller from './AuthleteApiCaller';

describe('AuthleteApiCaller', () => {
  describe('callPushedAuthReq', () => {
    it('should call pushAuthorizationRequest with correct parameters', async () => {
      // Arrange
      const mockApi = {
        pushAuthorizationRequest: vitest
          .fn()
          .mockResolvedValue(new PushedAuthReqResponse()),
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
          parameters,
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
      const mockApi = {
        pushAuthorizationRequest: vitest.fn().mockResolvedValue(mockResponse),
      };
      const caller = new AuthleteApiCaller(mockApi);

      // Act
      const response = await caller.callPushedAuthReq();

      // Assert
      expect(response).toBe(mockResponse);
    });

    it('should throw an error if pushAuthorizationRequest throws an error', async () => {
      // Arrange
      const mockError = new Error('API call failed');
      const mockApi = {
        pushAuthorizationRequest: vitest.fn().mockRejectedValue(mockError),
      };
      const caller = new AuthleteApiCaller(mockApi);

      // Act & Assert
      await expect(caller.callPushedAuthReq()).rejects.toThrowError(mockError);
    });
  });
});
