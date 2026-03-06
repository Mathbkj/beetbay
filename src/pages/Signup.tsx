import { useState, useRef } from "react";
import PasswordInput from "../components/PasswordInput";

export default function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // Validate password strength
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create account.");
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="font-[Manrope] bg-dark text-white min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
      <main className="relative w-full max-w-md">
        <section
          className="bg-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl shadow-primary/5"
          aria-labelledby="signup-title"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src="./assets/logo.svg"
              alt="BeatBay logo"
              className="w-32 h-auto"
            />
            <h1 id="signup-title" className="text-2xl font-bold">
              Create Account
            </h1>
            <p className="text-sm text-white/60">
              Join BeatBay and start exploring music today
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="signup_email"
                className="text-sm font-medium text-white/80"
              >
                Email
              </label>
              <input
                id="signup_email"
                name="email"
                type="email"
                placeholder="you@example.com"
                ref={emailRef}
                required
                className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
              />
            </div>

            <PasswordInput
              id="signup_password"
              label="Password"
              placeholder="Enter a password"
              ref={passwordRef}
            />

            <PasswordInput
              id="confirm_password"
              label="Confirm Password"
              placeholder="Confirm your password"
              ref={confirmPasswordRef}
            />

            <button
              className="mt-2 bg-primary text-dark text-sm font-bold rounded-lg px-4 py-3.5 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium no-underline hover:underline"
            >
              Sign In
            </a>
          </p>
        </section>
        {error && (
          <div className="fixed left-1/2 bottom-8 -translate-x-1/2 min-w-[250px] bg-destructive/90 backdrop-blur text-white text-center rounded-lg px-4 py-3 z-10 animate-[fadein_0.5s,fadeout_0.5s_2.5s] shadow-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="fixed left-1/2 bottom-8 -translate-x-1/2 min-w-[250px] bg-primary/90 backdrop-blur text-dark font-medium text-center rounded-lg px-4 py-3 z-10 animate-[fadein_0.5s,fadeout_0.5s_2.5s] shadow-lg">
            Account created successfully! Redirecting to login...
          </div>
        )}
      </main>
    </div>
  );
}
