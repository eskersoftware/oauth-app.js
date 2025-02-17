import * as OAuthMethods from "@octokit/oauth-methods";

import { ClientType, State } from "../types";

type StateOptions = "clientType" | "clientId" | "clientSecret" | "request";

export type GetWebFlowAuthorizationUrlOAuthAppOptions = Omit<
  OAuthMethods.GetWebFlowAuthorizationUrlOAuthAppOptions,
  StateOptions
>;
export type GetWebFlowAuthorizationUrlGitHubAppOptions = Omit<
  OAuthMethods.GetWebFlowAuthorizationUrlGitHubAppOptions,
  StateOptions
>;

export function getWebFlowAuthorizationUrlWithState(
  state: State,
  options: any
): any {
  const optionsWithDefaults = {
    clientId: state.clientId,
    request: state.octokit.request,
    ...options,
    allowSignup: options.allowSignup || state.allowSignup,
    scopes: options.scopes || state.defaultScopes,
  };

  return OAuthMethods.getWebFlowAuthorizationUrl({
    clientType: state.clientType,
    ...optionsWithDefaults,
  });
}

export interface GetWebFlowAuthorizationUrlInterface<
  TClientType extends ClientType
> {
  (
    options: TClientType extends "oauth-app"
      ? GetWebFlowAuthorizationUrlOAuthAppOptions
      : GetWebFlowAuthorizationUrlGitHubAppOptions
  ): TClientType extends "oauth-app"
    ? OAuthMethods.GetWebFlowAuthorizationUrlOAuthAppResult
    : OAuthMethods.GetWebFlowAuthorizationUrlGitHubAppResult;
}
