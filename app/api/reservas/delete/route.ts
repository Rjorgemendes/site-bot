import { reservas } from "../route";

export async function POST(request: Request) {
  const body = await request.json();

  reservas.splice(body.index, 1);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
