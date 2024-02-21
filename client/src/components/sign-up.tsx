/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/7YvuVc2UpjC
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center lg:grid lg:gap-0 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center space-y-2">
        <img
          alt="Image"
          className="rounded-full"
          height="400"
          src="/placeholder.svg"
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-600 dark:text-green-400" htmlFor="first-name">
                First name
              </Label>
              <Input className="text-gray-600 dark:text-gray-400" id="first-name" placeholder="Lee" required />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-600 dark:text-green-400" htmlFor="last-name">
                Last name
              </Label>
              <Input className="text-gray-600 dark:text-gray-400" id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-blue-600 dark:text-green-400" htmlFor="email">
              Email
            </Label>
            <Input
              className="text-gray-600 dark:text-gray-400"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-blue-600 dark:text-green-400" htmlFor="password">
              Password
            </Label>
            <Input className="text-gray-600 dark:text-gray-400" id="password" required type="password" />
          </div>
          <Button className="w-full bg-blue-600 text-white dark:bg-green-400" type="submit">
            Sign Up
          </Button>
          <Separator className="my-8" />
          <div className="space-y-4">
            <Button className="w-full text-blue-600 dark:text-green-400" variant="outline">
              Sign up with Google
            </Button>
            <Button className="w-full text-blue-600 dark:text-green-400" variant="outline">
              Sign up with Facebook
            </Button>
            <Button className="w-full text-blue-600 dark:text-green-400" variant="outline">
              Sign up with Apple
            </Button>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link className="underline text-blue-600 dark:text-green-400" to ="#">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
