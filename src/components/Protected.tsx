import { Navigate } from "react-router-dom";

interface IProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function Protected({ condition, children }: IProps) {
  if (!condition) return <Navigate to="/" replace />;

  return <>{children}</>;
}
