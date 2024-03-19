import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic here to handle form submission and initiate password reset process
    console.log("Submitting email:", email);
    // Reset email field after submission
    setEmail("");
  };

  return (
    <div className="pt-10 pb-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Forgot Password
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to receive a password reset link
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <div className="mx-auto max-w-sm space-y-4 mt-4 text-sm">
        <Link
          to="/login"
          className="flex items-center underline"
          style={{
            justifyContent: "flex-start",
          }}
        >
          Return to login
        </Link>
      </div>
    </div>
  );
}
