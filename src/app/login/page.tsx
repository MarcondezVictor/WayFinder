"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if(error) {
            alert(error.message);
            return;
        }

        alert("Login feito com sucesso!");
        console.log(data);
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Login</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
 }