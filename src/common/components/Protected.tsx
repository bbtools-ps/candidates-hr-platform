import { Navigate } from "react-router-dom";

interface ProtectedProps {
  condition: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ condition, children }) => {
  if (!condition) return <Navigate to="/" replace />;
  return <>{children}</>;
};
export default Protected;
