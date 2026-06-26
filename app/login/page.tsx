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

  // ✅ REGISTAR
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
    <div style={{ padding: 40 }}>
      <h1>Login 🔐</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={entrar}>Entrar</button>
      <button onClick={registar}>Criar conta</button>
    </div>
  );
}
``