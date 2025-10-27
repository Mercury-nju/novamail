import { getRequestContext } from 'cloudflare:workers';

// Pages Functions KV binding setup
// This is configured via Cloudflare Dashboard or wrangler.toml

export async function onRequest({ request, env, next }) {
  // Ensure KV is available to all Functions
  const response = await next({
    request,
    env: {
      ...env,
      // KV should be bound via Dashboard
      USERS_KV: env.USERS_KV
    }
  });
  
  return response;
}