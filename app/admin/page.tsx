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
    criarGraficoHora(data);
  }

  // ✅ gráfico por dia
  function criarGrafico(reservas: any[]) {
    const porDia: any = {};

    reservas.forEach((r) => {
      if (!porDia[r.data]) porDia[r.data] = 0;
      porDia[r.data]++;
    });

    const ctx = document.getElementById("grafico") as any;
    if (!ctx) return;

    // 🔴 evitar duplicação
    if ((window as any).chartDia) {
      (window as any).chartDia.destroy();
    }

    (window as any).chartDia = new Chart(ctx, {
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

  // ✅ gráfico por hora
  function criarGraficoHora(reservas: any[]) {
    const porHora: any = {};

    reservas.forEach((r) => {
      if (!porHora[r.hora]) porHora[r.hora] = 0;
      porHora[r.hora]++;
    });

    const ctx = document.getElementById("graficoHora") as any;
    if (!ctx) return;

    if ((window as any).chartHora) {
      (window as any).chartHora.destroy();
    }

    (window as any).chartHora = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(porHora),
        datasets: [
          {
            label: "Reservas por hora",
            data: Object.values(porHora),
          },
        ],
      },
    });
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div
      style={{
        padding: 30,
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1>Painel de Reservas 📊</h1>

      {/* ✅ CARDS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div
          style={{
            padding: 20,
            background: "#111",
            color: "white",
            borderRadius: 10
          }}
        >
          <h3>Total Reservas</h3>
          <h1>{reservas.length}</h1>
        </div>
      </div>

      {/* ✅ GRAFICOS */}
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            width: 400
          }}
        >
          <h3>Reservas por dia</h3>
          <canvas id="grafico"></canvas>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            width: 400
          }}
        >
          <h3>Reservas por hora</h3>
          <canvas id="graficoHora"></canvas>
        </div>

      </div>

      {/* ✅ TABELA */}
      <table
        style={{
          width: "100%",
          background: "white",
          marginTop: 40,
          borderRadius: 10,
          overflow: "hidden"
        }}
      >
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