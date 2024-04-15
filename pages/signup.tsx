'use client';

import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Icons,
  Input,
  Label,
  CardFooter
} from '../components/index';
import client from '../services/client';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { toastifyConfig } from '../lib/constants';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { UserState } from '../lib/types';
import UserStore from '../store/store';
import { shallow } from 'zustand/shallow';

const SignUp = (): JSX.Element => {
  const selector = (state: UserState) => ({
    signInUser: state.signInUser
  });
  const { signInUser } = UserStore(selector, shallow);

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignUp = (type: string) => {
    signIn(type, { callbackUrl: '/' });
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toast.error('Please fill all the fields', toastifyConfig);
      return;
    }
    const signUpParams = {
      _id: uuidv4(),
      firstName,
      lastName,
      email,
      password
    };
    await client
      .post('/users/register', signUpParams)
      .then(res => {
        if (res.status === 200) {
          signInUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            isUserSignedIn: true
          });
          setIsLoading(false);
          router.push('/');
        }
      })
      .catch(err => {
        setIsLoading(false);
        toast.error(err.response.data.error);
      });
  };
  return (
    <div className='flex justify-center'>
      <ToastContainer />
      <Card className='w-1/2 mt-40'>
        <CardHeader className='space-y-1'>
          <p className='text-2xl'>Welcome to the BLOG! Sign up now!</p>
          <div>Enter your email below to sign up or use the below services</div>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid grid-cols-2 gap-6'>
            <Button
              variant='outline'
              onClick={() => handleOAuthSignUp('github')}
            >
              <Icons.gitHub className='mr-2 h-4 w-4' />
              Github
            </Button>
            <Button
              variant='outline'
              onClick={() => handleOAuthSignUp('google')}
            >
              <FaGoogle className='mr-2 h-4 w-4' />
              Google
            </Button>
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>First Name</Label>
            <Input
              value={firstName}
              id='firstName'
              type='text'
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Last Name</Label>
            <Input
              value={lastName}
              id='lastName'
              type='text'
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              value={email}
              id='email'
              type='email'
              placeholder='m@example.com'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              value={password}
              id='password'
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardContent>
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className='text-green-500 font-bold cursor-pointer'
          >
            Sign in
          </span>
        </CardContent>
        <CardFooter>
          <Button
            variant='secondary'
            className='w-full bg-black text-white hover:text-black'
            onClick={handleSignUp}
          >
            {isLoading ? (
              <div className='animate-spin'>
                <Icons.loading />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
