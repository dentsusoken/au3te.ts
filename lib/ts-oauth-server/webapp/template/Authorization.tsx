import { AuthzPageModel } from '../../api/AuthzPageModel';
import '../css/authorization.css';

export const AuthorizationView = (props: AuthzPageModel) => {
  return (
    <>
      <div id="page_title">${props.getServiceName()}</div>

      <div id="content">
        <h3 id="client-name">${props.getClientName()}</h3>
        <div className="indent">
          <img id="logo" src={props.getLogoUri()} alt="[Logo] (150x150)" />

          <div id="client-summary">
            <p>${props.getDescription()}</p>
            <ul id="client-link-list">
              {props.getClientUri() && (
                <li>
                  <a target="_blank" href={props.getClientUri()}>
                    Homepage
                  </a>
                </li>
              )}
              {props.getPolicyUri() && (
                <li>
                  <a target="_blank" href={props.getPolicyUri()}>
                    Policy
                  </a>
                </li>
              )}
              {props.getTosUri() && (
                <li>
                  <a target="_blank" href={props.getTosUri()}>
                    Terms of Service
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>

        {props.getScopes() && (
          <>
            <h4 id="permissions">Permissions</h4>
            <div className="indent">
              <p>The application is requesting the following permissions.</p>

              <dl id="scope-list">
                {props.getScopes()?.map((scope) => (
                  <>
                    <dt>${scope.getName()}</dt>
                    <dd>${scope.getDescription()}</dd>
                  </>
                ))}
              </dl>
            </div>
          </>
        )}

        {props.getClaimsForIdToken() && (
          <>
            <h4 id="claims-for-id_token">Claims for ID Token</h4>
            <div className="indent">
              <ul>
                {props.getClaimsForIdToken()?.map((claim) => (
                  <li>${claim}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {props.getClaimsForUserInfo() && (
          <>
            <h4 id="claims-for-userinfo">Claims for UserInfo</h4>
            <div className="indent">
              <ul>
                {props.getClaimsForUserInfo()?.map((claim) => (
                  <li>${claim}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {props.getIdentityAssuranceRequired() && (
          <>
            <h4 id="identity-assurance">Identity Assurance</h4>
            <div className="indent">
              {props.getPurpose() && (
                <>
                  <h5>Purpose</h5>
                  <div className="indent">
                    <p>${props.getPurpose()}</p>
                  </div>
                </>
              )}
              {props.getAllVerifiedClaimsForIdTokenRequested() ||
                (props.getVerifiedClaimsForIdToken() && (
                  <>
                    <h5>Verified claims requested for ID token</h5>
                    <div className="indent">
                      {props.getAllVerifiedClaimsForIdTokenRequested() && 'All'}
                      {props.getVerifiedClaimsForIdToken() && (
                        <table
                          border={1}
                          cellPadding={5}
                          style={{ borderCollapse: 'collapse' }}
                          className="verified-claims"
                        >
                          <thead>
                            <tr style={{ backgroundColor: 'orange' }}>
                              <th>claim</th>
                              <th>purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props
                              .getVerifiedClaimsForIdToken()
                              ?.map((pair) => (
                                <tr>
                                  <td>${pair.getKey()}</td>
                                  <td>${pair.getValue()}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
        {props.getAuthorizationDetails() && (
          <>
            <h4 id="authorization-details">Authorization Details</h4>
            <div className="indent">
              <pre>{props.getAuthorizationDetails()}</pre>
            </div>
          </>
        )}

        <h4 id="authorization">Authorization</h4>
        <div className="indent">
          <p>Do you grant authorization to the application?</p>

          <form
            id="authorization-form"
            action="/api/authorization/decision"
            method="POST"
          >
            {props.getUser() && (
              <>
                <div id="login-fields" className="indent">
                  <div id="login-prompt">Input Login ID and Password.</div>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    placeholder="Login ID"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="font-default"
                    value={props.getLoginId()}
                    readOnly={!!props.getLoginIdReadOnly()}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="font-default"
                  />
                </div>
              </>
            )}
            {!props.getUser() && (
              <>
                <div id="login-fields" className="indent">
                  <div id="login-prompt">Input Login ID and Password.</div>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    placeholder="Login ID"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="font-default"
                    value={props.getLoginId()}
                    readOnly={!!props.getLoginIdReadOnly()}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="font-default"
                  />
                </div>
                {/* {props.getFederations() && <>
          <div id="federations" className="indent">
          <div id="federations-prompt">ID federation using an external OpenID Provider</div>
            {props.getFederationMessage() && <div id="federation-message">{props.getFederationMessage()}</div>
            }
          <ul>
            {props.getFederations().map((federation) => (
              <><li><a href="/api/federation/initiation/${federation.id}">${federation.server.name}</a></li>
              </>
            ))}
          </ul>
        </div>
        </>} */}
              </>
            )}

            {props.getUser() && (
              <div id="login-user" className="indent">
                Logged in as <b>{props.getUser()?.getSubject()}</b>. If
                re-authentication is needed, append{' '}
                <code>&amp;prompt=login</code>
                to the authorization request.
              </div>
            )}
            <div id="authorization-form-buttons">
              <input
                type="submit"
                name="authorized"
                id="authorize-button"
                value="Authorize"
                className="font-default"
              />
              <input
                type="submit"
                name="denied"
                id="deny-button"
                value="Deny"
                className="font-default"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
