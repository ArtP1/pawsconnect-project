import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

export const UpdatePasswordPage = () => {
  const { update_Password } = useUser();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm_password)
      console.log("password and confirm password are not matching");
    else {
      const resp = await update_Password(password);
      if (!resp) {
        console.log("could not update Password. Please try again");
        setPassword("");
      } else {
        console.log("password updated successfully. Please login");
        navigate("/Login");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 mt-8">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="m@example.com"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          placeholder="m@example.com"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};
