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
      if (!porDia[r.data]) porDia[r.data] = 0;
      porDia[r.data]++;
    });

    const ctx = document.getElementById("grafico") as any;
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(porDia),
        datasets: [
          {
            label: "Reservas por dia",
            data: Object.values(porDia),
          },
        ],
      },
    });
  }

  useEffect(() => {
    carregar();
  }, []);

  const total = reservas.length;

  return (
    <div style={{ padding: 30 }}>

      <h1>Painel de Reservas 📊</h1>

      {/* ✅ CARDS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={{ padding: 20, background: "#111", color: "white" }}>
          <h3>Total Reservas</h3>
          <h1>{total}</h1>
        </div>
      </div>

      {/* ✅ GRAFICO */}
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        maxWidth: 700
      }}>
        <canvas id="grafico"></canvas>
      </div>

      {/* ✅ TABELA */}
      <table style={{
        width: "100%",
        background: "white",
        borderRadius: 10,
        overflow: "hidden"
      }}>
        <thead style={{ background: "#111", color: "white" }}>
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
``