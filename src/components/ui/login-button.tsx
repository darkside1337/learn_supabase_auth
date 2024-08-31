import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

function LoginButton() {
  const router = useRouter();

  const handleRedirectToLogin = () => {
    router.push("/auth/login");
  };

  return <Button onClick={handleRedirectToLogin}>Login</Button>;
}

export default LoginButton;
