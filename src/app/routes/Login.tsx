import { Route } from "../routes/+types/Login";
import { IAPIResponse } from "../types/IAPIResponse";
import { Form, redirect } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import Cookies from "js-cookie";
import { getIsLoggedIn } from "@/storage/getIsLoggedIn";

export async function loader({ request }: Route.LoaderArgs) {
  const isLoggedIn = getIsLoggedIn(request);
  if (isLoggedIn) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  let result;

  try {
    // TODO: Fix the .env variable usage pointing to cached port?
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }
    const data: IAPIResponse = await response.json();
    const token = data.token!;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    result = {
      email: decodedToken.email,
      hash_pass: decodedToken.hash_pass,
      token,
    };
    Cookies.set("jwt_token", result?.token!, { expires: 1 });
  } catch (err) {
    if (err instanceof Error) {
      result = { error: err.message };
    }
  }
  return result;
}

export default function Login({ actionData }: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background text-white min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
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

          <Form className="flex flex-col gap-5" method="POST">
            <div className="flex flex-col gap-2">
              <Field
                data-invalid={actionData?.error ? "true" : "false"}
                className="group"
              >
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={actionData?.error ? "true" : "false"}
                  required
                  className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
                />
              </Field>
            </div>

            <div className="flex flex-col gap-2">
              <Field
                data-invalid={actionData?.error ? "true" : "false"}
                className="group"
              >
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    aria-invalid={actionData?.error ? "true" : "false"}
                    className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 pr-12 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-white/50 transition-colors hover:text-white focus:outline-none focus:text-white"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {actionData?.error && (
                  <FieldDescription className="group-data-invalid:text-red-500">
                    {actionData.error}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Button type="submit">Sign In</Button>
          </Form>

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
      </main>
    </div>
  );
}
