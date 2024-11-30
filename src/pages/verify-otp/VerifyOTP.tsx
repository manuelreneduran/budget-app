import { Loader } from "@mantine/core";
import { EmailOtpType } from "@supabase/supabase-js";
import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const verifyEmailToken = useCallback(
    async (token: string, type: EmailOtpType) => {
      try {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          type,
          token_hash: token,
        });

        if (verifyError) {
          throw verifyError;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            email_verified: true,
          },
        });

        if (updateError) {
          throw updateError;
        }
      } catch (e) {
        // TODO: Alert user of error
        console.error(e);
        navigate("/error");
      }
    },
    [navigate] // Dependency array
  );

  useEffect(() => {
    const token = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;

    if (token && type) {
      verifyEmailToken(token, type);
    }
  }, [searchParams, verifyEmailToken]);

  return <Loader />;
};
