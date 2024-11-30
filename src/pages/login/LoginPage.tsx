import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (err) {
      setError("An error has occured. Please try again later.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            mt="md"
          />
          {error && (
            <Text color="red" mt="sm">
              {error}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
          <Text ta="center" mt="md">
            Don't have an account?{" "}
            <Anchor component={Link} to="/signup" size="sm">
              Sign up
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
};
