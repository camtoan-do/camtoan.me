// Static JSON copy of the changelog, served at /changelog.json and used by GET /api/changelog.
import { getChanges } from "../changelog";

export async function GET() {
  const changes = await getChanges();
  return new Response(JSON.stringify({ updated: changes[0]?.date ?? null, changes }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
