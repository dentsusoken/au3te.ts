import { AuthzPageModel } from '../../api/AuthzPageModel';

export const AuthorizationView = (props: AuthzPageModel) => {
  return (
    <div>
      <h1>Authorization</h1>
      <p>Authorization page</p>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};
