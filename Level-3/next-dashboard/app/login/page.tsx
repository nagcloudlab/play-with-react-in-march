"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(e: any) {
        e.preventDefault()
        await signIn("credentials", {
            username,
            password,
            callbackUrl: "/dashboard"
        })
    }

    return (

        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-100">
                    Login
                </button>

            </form>

        </div>

    )

}
