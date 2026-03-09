import { useState, useRef, useTransition, SubmitEvent, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../ui/Spinner";
import { IAPIResponse } from "../types/IAPIResponse";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Button } from "@/ui/Button";

export default function Login() {
  const { login, user } = useAuth();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed. Please check your credentials.");
        }

        const data: IAPIResponse = await response.json();
        const token = data.token!;

        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        await login(decodedToken.email, decodedToken.hash_pass);

        Cookies.set("jwt_token", token, { expires: 1 });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Login failed. Please try again.",
        );
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };
    startTransition(async () => await processData());
  };
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-background text-white min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
      <main className="relative w-full max-w-md">
        <section
          className="bg-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl shadow-primary/5"
          aria-labelledby="login-title"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src="./assets/logo.svg"
              alt="BeatBay logo"
              className="w-32 h-auto"
            />
            <h1 id="login-title" className="text-2xl font-bold">
              Welcome back
            </h1>
            <p className="text-sm text-white/60">
              Sign in to continue listening on BeatBay
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                ref={emailRef}
                required
                className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                required
                className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-sm text-white/60">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-medium no-underline hover:underline"
            >
              Create one
            </a>
          </p>
        </section>
        {error && (
          <div className="fixed left-1/2 bottom-8 -translate-x-1/2 min-w-[250px] bg-destructive/90 backdrop-blur text-white text-center rounded-lg px-4 py-3 z-10 animate-[fadein_0.5s,fadeout_0.5s_2.5s] shadow-lg">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
