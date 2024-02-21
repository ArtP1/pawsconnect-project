import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/routes/signup', { // Adjust the API endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page on successful sign-up
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to sign up');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center lg:grid lg:gap-0 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center space-y-2">
        <img
          alt="Welcome to Pets"
          className="rounded-full"
          src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/6/16/1/shutterstock_1862856634.jpg.rend.hgtvcom.1280.853.suffix/1655430860853.jpeg"
          style={{ aspectRatio: "400/400", objectFit: "cover" }}
          width="400"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-red-600 dark:text-yellow-400">Welcome to Pets</h1>
          <p className="text-gray-600 dark:text-gray-400">Pet management app</p>
        </div>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-green-400">Sign Up</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" className="w-full bg-blue-600 text-white dark:bg-green-400">
            Sign Up
          </Button>
          <Separator className="my-8" />
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link to="/login" className="underline text-blue-600 dark:text-green-400">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
