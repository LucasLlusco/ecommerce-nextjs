export const runtime = "edge"

export async function GET() {
  return Response.json({ status: "edge todo ok" });
}