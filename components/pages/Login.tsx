import React from "react";
import { LoginCard } from "@/components/personal-components/logincard";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 box-border">
      <LoginCard />
    </div>
  );
};

export default Login;
