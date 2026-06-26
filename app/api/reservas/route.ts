export let reservas: any[] = [];

// ✅ CRIAR reserva
export async function POST(request: Request) {
  const body = await request.json();

  const { data, hora } = body;

  const reservasMesmoHorario = reservas.filter(
    (r) => r.data === data && r.hora === hora
  );

  if (reservasMesmoHorario.length >= 5) {
    return new Response(
      JSON.stringify({ ok: false, mensagem: "Sem mesas disponíveis" }),
      { status: 200 }
    );
  }

  reservas.push(body);

  return new Response(
    JSON.stringify({ ok: true, mensagem: "Reserva confirmada!" }),
    { status: 200 }
  );
}

// ✅ LISTAR reservas
export async function GET() {
  return new Response(JSON.stringify(reservas), { status: 200 });
}