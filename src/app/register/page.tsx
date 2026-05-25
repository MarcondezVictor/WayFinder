"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if(error) {
            alert(error.message);
            return;
        }

        alert("Conta criada! Confirma email se necessário.");
        console.log(data);
    }

    return (
        <div style={{ padding: 40}}>
            <h1>Register</h1>

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

            <button onClick={handleRegister}>
                Criar conta
            </button>
        </div>
    );
}