"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [reservas, setReservas] = useState<any[]>([]);

  async function carregar() {
    const res = await fetch("/api/reservas");
    const data = await res.json();
    setReservas(data);
  }

  async function apagar(index: number) {
    await fetch("/api/reservas/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index })
    });
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Painel de Reservas 📊</h1>

      <button onClick={carregar} style={{ marginBottom: 20 }}>
        🔄 Atualizar
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white"
        }}
      >
        <thead>
          <tr style={{ background: "#111", color: "white" }}>
            <th>Nome</th>
            <th>Email</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Pessoas</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {reservas.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{r.nome}</td>
              <td>{r.email}</td>
              <td>{r.data}</td>
              <td>{r.hora}</td>
              <td>{r.pessoas}</td>
              <td>
                <button onClick={() => apagar(i)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}