import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useUser from '@/hooks/useUser';

interface InputError {
  type: string,
  value: string,
  msg: string,
  path: 'firstName' | 'lastName' | 'username' | 'email' | 'password',
  location: string
}


interface IUserData {
  id: string;
};


export function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn<IUserData>();
  const { signup } = useUser();


  const handleSignUp = async (e: { preventDefault: () => void; }) => { // preventDefault, makes sure the form is not submitted if blank
    e.preventDefault();

    const resp = await signup({ first_name: firstName, last_name: lastName, username, email, password });

    setFirstNameError('');
    setLastNameError('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setError('');

    if (resp && resp.success) {

      signIn({
        auth: {
          token: resp.data.accessToken,
          type: "Bearer"
        },
        userState: { id: resp.data.id },
        refresh: resp.data.refreshToken
      });

      navigate('/');

    } else if (resp) {

      resp.data.forEach((err: InputError) => {

        switch (err.path) {
          case 'firstName':
            setFirstNameError(err.msg);
            break;
          case 'lastName':
            setLastNameError(err.msg);
            break;
          case 'username':
            setUsernameError(err.msg);
            break;
          case 'email':
            setEmailError(err.msg);
            break;
          case 'password':
            setPasswordError(err.msg);
            break;
          default:
            break;
        }

      });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 text-center lg:grid lg:gap-0 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center space-y-2">
        <img
          alt="Image"
          className="rounded-full"
          height="400"
          src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/6/16/1/shutterstock_1862856634.jpg.rend.hgtvcom.1280.853.suffix/1655430860853.jpeg"
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
          width="400"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-red-600 dark:text-yellow-400">Welcome to PawsConnect</h1>
          <p className="text-gray-600 dark:text-gray-400">Pet management app</p>
        </div>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-green-400">Sign Up</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label className="text-blue-600 dark:text-green-400" htmlFor="first-name">First name</Label>
                <Input
                  className="text-gray-600 dark:text-gray-400"
                  id="first-name"
                  placeholder="Lee"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  type='text' />
              </div>

              <div className="space-y-2" >
                <Label className="text-blue-600 dark:text-green-400" htmlFor="last-name">Last name</Label>
                <Input
                  className="text-gray-600 dark:text-gray-400"
                  id="last-name"
                  placeholder="Robinson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  type='text' />
              </div>

              {(firstNameError && lastNameError) ?
                <div className="col-span-2 text-red-400 text-sm">* Both names must be alphabetical characters</div> :
                (firstNameError) ?
                  <div className="col-span-2 text-red-400 text-sm">* {firstNameError}</div> :
                  <div className="col-span-2 text-red-400 text-sm">* {lastNameError}</div>}

            </div>
            <div className="space-y-2">
              <Label className="text-blue-600 dark:text-green-400" htmlFor="username">Username</Label>
              <Input
                className="text-gray-600 dark:text-gray-400"
                id="username"
                placeholder="leeRob123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type='text' />
            </div>

            {usernameError && <div className="text-red-400 text-sm">* {usernameError}</div>}

            <div className="space-y-2">
              <Label className="text-blue-600 dark:text-green-400" htmlFor="email">Email</Label>
              <Input
                className="text-gray-600 dark:text-gray-400"
                id="email"
                placeholder="lee@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email" />
            </div>

            {emailError && <div className="text-red-400 text-sm">* {emailError}</div>}

            <div className="space-y-2">
              <Label className="text-blue-600 dark:text-green-400" htmlFor="password">Password</Label>
              <Input
                className="text-gray-600 dark:text-gray-400"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password" />
            </div>

            {(error || passwordError) && <div className="text-red-500 text-sm">{error || passwordError}</div>}

            <Button className="w-full bg-blue-600 text-white dark:bg-green-400" type="submit">Sign Up</Button>

            <Separator className="my-8" />

            <div className="space-y-4">
              <Button className="w-full text-blue-600 dark:text-green-400" variant="outline">Sign up with Google</Button>
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <span className='mr-2.5'>Already have an account?</span>
                <Link className="underline text-blue-600 dark:text-green-400" to="/login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

