export async function onRequest(context) {
  return new Response(JSON.stringify({
    success: true,
    message: "This is a test from Cloudflare Pages Functions",
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
