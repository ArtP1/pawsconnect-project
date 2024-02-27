import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { configs } from "@/configs";
const BASE_URL = configs.api.BASE_URL;

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/'); // Redirect to the home page or dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to login');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center lg:grid lg:gap-0 lg:grid-cols-2">
      {/* Image and Welcome Text Section (Hidden on smaller screens) */}
      <div className="hidden lg:flex flex-col items-center justify-center space-y-2">
        <img
          alt="Image"
          className="rounded-full"
          src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/6/16/1/shutterstock_1862856634.jpg.rend.hgtvcom.1280.853.suffix/1655430860853.jpeg"
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
          width="400"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Pets</h1>
          <p className="text-gray-500 dark:text-gray-400">Pet management app</p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" to="/forgot-password">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button className="w-full" type="submit">
            Login
          </Button>
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
