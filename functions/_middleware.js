/**
 * Middleware to provide KV binding to Functions
 */

export async function onRequest({ request, next, env }) {
  // This ensures KV is available to all Functions
  const response = await next({
    request,
    env
  });
  
  return response;
}
