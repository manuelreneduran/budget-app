import { Navigate, useLocation } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

interface PublicRouteProps {
  session: Session | null;
  children: React.ReactNode;
}

function PublicRoute({ session, children }: PublicRouteProps) {
  const location = useLocation();

  if (session) {
    // Redirect to dashboard if user is authenticated
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default PublicRoute;
