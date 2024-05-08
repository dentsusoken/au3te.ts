import { AuthzPageModel } from '../../api/AuthzPageModel';

export const AuthorizationView = (props: AuthzPageModel) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes"
        />
        <title>{props.getServiceName()} | Authorization</title>
        {/* <link rel="stylesheet" href="./css/authorization.css" />
        <link rel="stylesheet" href="../../css/authorization.css" /> */}
        {/* TODO 別ファイルに分ける */}
        <style>
          {`
         /*
         * Copyright (C) 2016-2022 Authlete, Inc.
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *     http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing,
         * software distributed under the License is distributed on an
         * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
         * either express or implied. See the License for the specific
         * language governing permissions and limitations under the
         * License.
         */
        
        .font-default {
          font-family: 'Source Sans Pro', 'Helvetica Neue', 'Segoe UI', 'Arial',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #666;
        }
        
        body {
          margin: 0;
          text-shadow: none;
        }
        
        p {
          margin-top: 0;
        }
        
        h3,
        h4 {
          color: steelblue;
        }
        
        .indent {
          margin-left: 15px;
        }
        
        #page_title {
          background: #f5f5f5;
          color: steelblue;
          padding: 0.5em;
          margin: 0;
        }
        
        #content {
          padding: 0 20px 20px;
        }
        
        #logo {
          width: 150px;
          height: 150px;
          background: lightgray;
          margin: 0 20px 10px 5px;
          float: left;
        }
        
        #client-summary {
          float: left;
        }
        
        #client-link-list {
          margin: 0;
          padding: 0;
        }
        
        #client-link-list li {
          list-style-type: none;
        }
        
        #client-link-list a {
          position: relative;
          padding-left: 25px;
          text-decoration: none;
          color: cadetblue;
        }
        
        #client-link-list a:hover {
          text-decoration: underline;
        }
        
        #client-link-list a:before {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 0;
          margin: -5px 0 0 0;
          border-top: 12px solid cadetblue;
          border-left: 12px solid transparent;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        
        #scope-list {
          margin-left: 20px;
        }
        
        #scope-list dt {
          font-weight: bold;
        }
        
        #scope-list dd {
          margin-bottom: 10px;
        }
        
        input {
          color: black;
        }
        
        #login-fields {
          margin-bottom: 20px;
        }
        
        #login-prompt {
          font-size: 85%;
          margin-bottom: 5px;
        }
        
        #loginId {
          display: block;
          border: 1px solid #666;
          border-bottom: none;
          padding: 0.3em 0.5em;
          width: 300px;
        }
        
        #password {
          display: block;
          border: 1px solid #666;
          padding: 0.3em 0.5em;
          width: 300px;
        }
        
        #login-user {
          font-style: italic;
        }
        
        #federations-prompt {
          font-size: 85%;
          margin-bottom: 5px;
        }
        
        #federation-message {
          font-size: 85%;
          margin-bottom: 5px;
          color: darkred;
        }
        
        #authorization-form-buttons {
          margin: 20px auto;
        }
        
        #authorize-button,
        #deny-button {
          display: inline-block;
          width: 150px;
          padding: 12px 0;
          margin: 13px;
          min-height: 26px;
          text-align: center;
          text-decoration: none;
          outline: 0;
          -webkit-transition: none;
          transition: none;
        }
        
        #authorize-button {
          background-color: #4285f4;
          color: white;
        }
        
        #authorize-button:hover {
          background-color: #1255f4;
        }
        
        #authorize-button:active {
          background-color: blue;
        }
        
        #deny-button {
          background-color: #f08080;
          color: white;
        }
        
        #deny-button:hover {
          background-color: #f05050;
        }
        
        #deny-button:active {
          background-color: red;
        }
        
        pre {
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-left: 3px solid #33b0f3;
          color: #666;
          page-break-inside: avoid;
          font-family: monospace;
          margin-bottom: 1.6em;
          max-width: 60%;
          overflow: auto;
          padding: 1em 1.5em;
          display: block;
          word-wrap: break-word;
        }
        
        `}
        </style>
      </head>
      <div id="page_title">{props.getServiceName()}</div>

      <div id="content">
        <h3 id="client-name">{props.getClientName()}</h3>
        <div className="indent">
          <img id="logo" src={props.getLogoUri()} alt="[Logo] (150x150)" />

          <div id="client-summary">
            <p>{props.getDescription()}</p>
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
                    <dt>{scope.getName()}</dt>
                    <dd>{scope.getDescription()}</dd>
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
                  <li>{claim}</li>
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
                  <li>{claim}</li>
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
                    <p>{props.getPurpose()}</p>
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
                                  <td>{pair.getKey()}</td>
                                  <td>{pair.getValue()}</td>
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
              <><li><a href="/api/federation/initiation/{federation.id}">{federation.server.name}</a></li>
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
