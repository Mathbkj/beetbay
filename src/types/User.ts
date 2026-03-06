export interface User {
  email: string;
  password: string;
  tier: "free" | "premium";
}
