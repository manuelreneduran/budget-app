import React, { useEffect, useState } from "react";
import { Container, Title, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Container>
      <Title>Dashboard</Title>
      <Title order={2}>Welcome, {user.email}</Title>
      <Button onClick={handleLogout} mt="md">
        Logout
      </Button>
    </Container>
  );
};
