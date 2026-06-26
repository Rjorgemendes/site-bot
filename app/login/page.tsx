"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN
  async function entrar() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      window.location.href = "/admin";
    }
  }

  // ✅ REGISTO
  async function registar() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Erro: " + error.message);
    } else {
      alert("Conta criada ✅");
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Login 🔐 ✅</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: 250 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, width: 250 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={entrar}
          style={{
            padding: 10,
            marginRight: 10,
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>

        <button
          onClick={registar}
          style={{
            padding: 10,
            background: "#2196F3",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}