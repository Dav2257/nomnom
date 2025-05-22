interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/nomnoms")) {
      const { results } = await env.DB.prepare("SELECT * FROM nomnoms").all();
      return Response.json(results);
    }

    return env.ASSETS.fetch(request);
  },
};