import { Navigate } from "react-router-dom";

interface IProtectedProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function Protected({ condition, children }: IProtectedProps) {
  if (!condition) return <Navigate to="/" replace />;

  return <>{children}</>;
}
