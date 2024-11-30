import { Session } from "@supabase/supabase-js";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  session: Session | null;
  children: React.ReactNode;
}

function ProtectedRoute({ session, children }: ProtectedRouteProps) {
  const location = useLocation();

  if (!session) {
    // Redirect to sign-in, but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
