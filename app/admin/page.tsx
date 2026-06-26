"use client";

import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Admin() {
  const [reservas, setReservas] = useState<any[]>([]);

  async function carregar() {
    const res = await fetch("/api/reservas");
    const data = await res.json();
    setReservas(data);

    criarGrafico(data);
  }

  function criarGrafico(reservas: any[]) {
    const porDia: any = {};

    reservas.forEach((r) => {
      if (!porDia[r.data]) {
        porDia[r.data] = 0;
      }
      porDia[r.data]++;
    });

    const labels = Object.keys(porDia);
    const valores = Object.values(porDia);

    const ctx = document.getElementById("grafico") as any;

    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Reservas por dia",
            data: valores,
          },
        ],
      },
    });
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

      {/* ✅ GRAFICO */}
      <canvas id="grafico" style={{ maxWidth: 600 }} />

      <table style={{ width: "100%", marginTop: 30 }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Pessoas</th>
          </tr>
        </thead>

        <tbody>
          {reservas.map((r, i) => (
            <tr key={i}>
              <td>{r.nome}</td>
              <td>{r.email}</td>
              <td>{r.data}</td>
              <td>{r.hora}</td>
              <td>{r.pessoas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}