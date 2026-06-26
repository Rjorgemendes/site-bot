import { supabase } from "../../../lib/supabase";

// ✅ CRIAR RESERVA
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, data, hora, pessoas } = body;

    const { data: existentes, error: erroConsulta } = await supabase
      .from("reservas")
      .select("*")
      .eq("data", data)
      .eq("hora", hora);

    if (erroConsulta) {
      return new Response(
        JSON.stringify({ ok: false, mensagem: erroConsulta.message }),
        { status: 500 }
      );
    }

    // ✅ CORRETO
    if (existentes && existentes.length >= 5) {
      return new Response(
        JSON.stringify({
          ok: false,
          mensagem: "Sem mesas disponíveis para este horário"
        }),
        { status: 200 }
      );
    }

    const { error: erroInsert } = await supabase
      .from("reservas")
      .insert([{ nome, email, data, hora, pessoas }]);

    if (erroInsert) {
      return new Response(
        JSON.stringify({ ok: false, mensagem: erroInsert.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, mensagem: "Reserva confirmada!" }),
      { status: 200 }
    );

  } catch {
    return new Response(
      JSON.stringify({ ok: false, mensagem: "Erro interno" }),
      { status: 500 }
    );
  }
}

// ✅ GET
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .order("data", { ascending: true })
      .order("hora", { ascending: true });

    if (error) return new Response("[]");

    return new Response(JSON.stringify(data || []));
  } catch {
    return new Response("[]");
  }
}

// ✅ DELETE
export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");

    await supabase.from("reservas").delete().eq("id", id);

    return new Response(JSON.stringify({ ok: true }));
  } catch {
    return new Response(JSON.stringify({ ok: false }));
  }
}
``