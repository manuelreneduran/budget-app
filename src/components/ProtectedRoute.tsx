import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../library/axiosConfig";

const ProtectedRoute: React.FC = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/me", {
          withCredentials: true,
        });
        console.log("---", response.status);
        return response.data;
      } catch (error) {
        throw new Error("Not authenticated");
      }
    },
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Or a Mantine Loader
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={user} />;
};

export default ProtectedRoute;
