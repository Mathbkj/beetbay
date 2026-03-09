import { Navigate } from "react-router-dom";
import { User } from "../types/User";
import { useEffect } from "react";

export function ProtectedComponent({
  user,
  children,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  useEffect(() => {
    if (!user) {
      <Navigate to="/login" replace />;
    }
  }, []);
  return children;
}
