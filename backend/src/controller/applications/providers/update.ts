import { Context } from "hono";
import { z } from "zod";

import {
  handleError,
  updateApplicationError,
  unauthorizedDataRequestError,
} from "../../../utils/error-responses";
import {
  handleSuccess,
  SuccessResponse,
} from "../../../utils/success-responses";
import { checkAccess } from "../../../utils/application";
import { ApplicationClient } from "../../../do/AuthC1App";
import { ProviderSettings } from "../../../models/provider";
import { ApplicationRequest } from "../create";

export const schema = z.object({
  email_provider_enabled: z.boolean().optional(),
  sender_email: z.string().optional(),
  email_template_body: z.string().optional(),
  email_template_subject: z.string().optional(),
  email_verification_enabled: z.boolean().optional(),
  code_expires_in: z.number().optional(),
  email_verification_method: z.string().optional(),
  reset_confirmation_email: z.boolean().optional(),
  password_regex: z.string().optional(),

  phone_provider_enabled: z.boolean().optional(),
  text_template_body: z.string().optional(),

  discord_provider_enabled: z.boolean().optional(),
  discord_client_id: z.string().optional(),
  discord_client_secret: z.string().optional(),
  discord_redirect_uri: z.string().optional(),
  discord_scope: z.string().optional(),

  facebook_provider_enabled: z.boolean().optional(),
  facebook_client_id: z.string().optional(),
  facebook_client_secret: z.string().optional(),
  facebook_redirect_uri: z.string().optional(),
  facebook_scope: z.string().optional(),

  apple_provider_enabled: z.boolean().optional(),
  apple_team_id: z.string().optional(),
  apple_key_id: z.string().optional(),
  apple_client_id: z.string().optional(),
  apple_private_key: z.string().optional(),
  apple_redirect_uri: z.string().optional(),
  apple_scope: z.string().optional(),

  github_provider_enabled: z.boolean().optional(),
  github_client_id: z.string().optional(),
  github_client_secret: z.string().optional(),
  github_redirect_uri: z.string().optional(),
  github_scope: z.string().optional(),

  google_provider_enabled: z.boolean().optional(),
  google_client_id: z.string().optional(),
  google_client_secret: z.string().optional(),
  google_redirect_uri: z.string().optional(),
  google_scope: z.string().optional(),

  linkedin_provider_enabled: z.boolean().optional(),
  linkedin_client_id: z.string().optional(),
  linkedin_client_secret: z.string().optional(),
  linkedin_redirect_uri: z.string().optional(),
  linkedin_scope: z.string().optional(),

  spotify_provider_enabled: z.boolean().optional(),
  spotify_client_id: z.string().optional(),
  spotify_client_secret: z.string().optional(),
  spotify_redirect_uri: z.string().optional(),
  spotify_scope: z.string().optional(),

  twitter_provider_enabled: z.boolean().optional(),
  twitter_client_id: z.string().optional(),
  twitter_client_secret: z.string().optional(),
  twitter_redirect_uri: z.string().optional(),
  twitter_scope: z.string().optional(),
});

export type ApplicationProviderRequest = z.infer<typeof schema>;

export const updateApplicationProviderController = async (c: Context) => {
  try {
    const body: Partial<ProviderSettings> = await c.req.valid("json");
    const applicationId = c.req.param("id");
    const user = c.get("user");
    console.log("updateApplicationProviderController", body);
    const key = `${applicationId}:email:${user.email}`;
    const hasAccess = checkAccess(c, key, applicationId);

    if (!hasAccess) {
      return handleError(unauthorizedDataRequestError, c);
    }

    const id = c.env.AuthC1App.idFromString(applicationId);
    const applicationObj = c.env.AuthC1App.get(id);
    const appClient = new ApplicationClient(applicationObj);

    await appClient.update({
      providerSettings: {
        ...body,
      },
    } as ApplicationRequest);

    const response: SuccessResponse = {
      message: "Application updated successfully",
      data: {
        id: applicationId,
        ...body,
      },
    };
    return handleSuccess(c, response);
  } catch (err: any) {
    console.log(err);

    return handleError(updateApplicationError, c, err);
  }
};

export default updateApplicationProviderController;
