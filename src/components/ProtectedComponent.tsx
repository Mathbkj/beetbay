import { Navigate } from "react-router-dom";
import { User } from "../types/User";

export function ProtectedComponent({
  user,
  children,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  if (typeof window !== "undefined" && !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
