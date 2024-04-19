import { describe, expect, it, vitest } from 'vitest';
// import { AuthleteApi } from 'your-authlete-api-library';
import AuthleteApi from '../au3te-ts-common/api/AuthleteApi';
import PushedAuthReqHandler, { Params } from './PushedAuthReqHandler';

describe('PushedAuthReqHandler', () => {
  describe('handle', () => {
    it('should call the process method with the correct parameters and return the response', async () => {
      // Arrange
      const api: AuthleteApi = new AuthleteApi(); // Create an instance of AuthleteApi
      const params: Params = new Params(); // Create an instance of Params
      const expectedResponse: Response = new Response(); // Create an instance of Response
      const handler = new PushedAuthReqHandler(api);

      // Mock the process method
      vitest.spyOn(handler, 'process').mockImplementation(async () => {
        return expectedResponse;
      });

      // Act
      const actualResponse = await handler.handle(params);

      // Assert
      expect(handler.process).toHaveBeenCalledWith(
        params.getParameters(),
        expect.any(String),
        expect.any(String),
        params.getClientCertificatePath(),
        params.getDpop(),
        params.getHtm(),
        params.getHtu()
      );
      expect(actualResponse).toBe(expectedResponse);
    });

    it('should throw an error when an unexpected error occurs in the process method', async () => {
      // Arrange
      const api: AuthleteApi = new AuthleteApi(); // Create an instance of AuthleteApi
      const params: Params = new Params(); // Create an instance of Params
      const handler = new PushedAuthReqHandler(api);

      // Mock the process method to throw an error
      vitest.spyOn(handler, 'process').mockImplementation(async () => {
        throw new Error('Unexpected error');
      });

      // Act and Assert
      await expect(handler.handle(params)).rejects.toThrowError(
        'Unexpected error'
      );
    });
  });
});
