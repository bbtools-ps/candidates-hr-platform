import { Navigate } from "react-router";

interface ProtectedProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function Protected({ condition, children }: ProtectedProps) {
  if (!condition) return <Navigate to="/" replace />;

  return <>{children}</>;
}
