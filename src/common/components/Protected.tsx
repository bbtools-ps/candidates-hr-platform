import { Navigate } from "react-router-dom";

interface IProtectedProps {
  condition: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<IProtectedProps> = ({ condition, children }) => {
  if (!condition) return <Navigate to="/" replace />;
  return <>{children}</>;
};
export default Protected;
