// TODO 安藤実装済み
import { CredentialRequestInfo } from './CredentialRequestInfo';

export class CredentialSingleParseResponse {
  private responseContent?: string;
  private info?: CredentialRequestInfo;

  getResponseContent(): string | undefined {
    return this.responseContent;
  }
  setResponseContent(content: string): CredentialSingleParseResponse {
    this.responseContent = content;
    return this;
  }
  getInfo(): CredentialRequestInfo | undefined {
    return this.info;
  }
  setInfo(info: CredentialRequestInfo): CredentialSingleParseResponse {
    this.info = info;
    return this;
  }
}
