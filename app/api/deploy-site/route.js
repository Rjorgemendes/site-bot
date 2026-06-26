export async function POST(req) {
  try {
    const { html } = await req.json();

    const response = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        Authorization: `Bearer vrl_vcp_1Yt3mejxtJhBoAeYEcJ08165ZjltvvpRCD8dxOq5vNB7h4VEdl3ApOo5`, // TEU TOKEN AQUI
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "site-gerado",
        files: [
          {
            file: "index.html",
            data: html,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log(data); // 👈 MUITO IMPORTANTE

    // 👉 este campo é o correto
    const url = data.deployments?.[0]?.url || data.url;

    return new Response(
      JSON.stringify({ url }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Erro ao publicar site" }),
      { status: 500 }
    );
  }
}
