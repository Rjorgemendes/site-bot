"use client";

import { useState } from "react";

export default function Home() {
  const [descricao, setDescricao] = useState("");
  const [html, setHtml] = useState("");

  async function gerar() {
    const res = await fetch("/api/create-site", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ descricao })
    });

    const data = await res.json();
    setHtml(data.html);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Criador de Sites 🔥</h1>

      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="restaurante"
      />

      <button onClick={gerar}>Gerar</button>

      <iframe srcDoc={html} style={{ width:"100%", height:600 }} />
    </div>
  );
}
``