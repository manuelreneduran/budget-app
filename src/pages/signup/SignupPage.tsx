import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { getBaseUrl } from "../../utils/url";

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const baseUrl = getBaseUrl();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${baseUrl}/verify-otp`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError("An error has occured. Please try again later.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an Account</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSignup}>
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
            Sign Up
          </Button>
          <Text ta="center" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} to="/login" size="sm">
              Log in
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
};
