export async function POST(request: Request) {
  let descricao = "restaurante moderno";

  try {
    const body = await request.json();
    if (body?.descricao) {
      descricao = body.descricao;
    }
  } catch {}

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>
body{
  margin:0;
  font-family:Arial;
  background:#0f172a;
  color:white;
}

/* HERO */
.hero{
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  background:url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600") center/cover;
}

.hero h1{
  font-size:60px;
}

/* MENU */
.container{
  max-width:1100px;
  margin:auto;
  padding:60px 20px;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:25px;
}

.card{
  background:#1e293b;
  border-radius:10px;
  overflow:hidden;
}

.card img{
  width:100%;
  height:200px;
  object-fit:cover;
}

.card-content{
  padding:20px;
}

/* FORM */
form{
  background:#1e293b;
  padding:25px;
  border-radius:10px;
  margin-top:40px;
}

input, button{
  width:100%;
  padding:12px;
  margin-top:10px;
}

button{
  background:#f59e0b;
  border:none;
}
</style>

<script>
async function reservar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const pessoas = document.getElementById("pessoas").value;

  const res = await fetch("/api/reservas", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ nome, email, data, hora, pessoas })
  });

  const r = await res.json();

  if (!r.ok) {
    alert("❌ " + r.mensagem);
  } else {
    alert("✅ " + r.mensagem);
  }
}
</script>

</head>

<body>

<!-- HERO -->
<div class="hero">
  <h1>${descricao}</h1>
</div>

<!-- MENU -->
<div class="container">

  <h2>Menu</h2>

  <div class="grid">
    <div class="card">
      <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800" />
      <div class="card-content">
        <h3>Massa Italiana</h3>
      </div>
    </div>

    <div class="card">
      <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800" />
      <div class="card-content">
        <h3>Pizza</h3>
      </div>
    </div>

    <div class="card">
      <img src="https://images.unsplash.com/photo-1514516873439-d9d47d5c1a9f?w=800" />
      <div class="card-content">
        <h3>Vinhos</h3>
      </div>
    </div>
  </div>

  <!-- RESERVAS -->
  <h2>Reservar Mesa</h2>

  <form onsubmit="event.preventDefault(); reservar();">
    <input id="nome" placeholder="Nome" required />
    <input id="email" placeholder="Email" required />
    <input id="data" type="date" required />
    <input id="hora" type="time" required />
    <input id="pessoas" placeholder="Número de pessoas" required />
    <button type="submit">Reservar</button>
  </form>

</div>

</body>
</html>
`;

  return new Response(JSON.stringify({ html }), {
    headers: { "Content-Type": "application/json" }
  });
}
``