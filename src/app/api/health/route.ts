/** Kamal proxy health check. */
export function GET() {
  return Response.json({ ok: true, sha: process.env.GIT_SHA ?? "dev" });
}
