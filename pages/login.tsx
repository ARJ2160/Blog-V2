'use client';

import { Card, CardContent, CardHeader } from '../components/ui/card';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Icons, Input, Label } from '../components';
import client from '../services/client';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { toastifyConfig } from '../lib/constants';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOAuthSignIn = (type: string) => {
    signIn(type, { callbackUrl: '/' });
  };
  const handleSignIn = async () => {
    const signInParams = { email, password };
    if (!email || !password) {
      console.log('>> HERE', email, password);
      toast.error('Please fill all the fields', toastifyConfig);
      return;
    }
    await client
      .post('/users/signin', signInParams)
      .then(res => {
        if (res.status === 200) {
          router.push('/');
        }
      })
      .catch(err => {
        console.log('>>', err);
        if (err.response.status === 404) {
          toast(err.response.data.error);
        }
      });
  };
  return (
    <div className='flex justify-center'>
      <ToastContainer />
      <Card className='w-1/2 mt-40'>
        <CardHeader className='space-y-1'>
          <p className='text-2xl'>
            Welcome to the BLOG! Sign into your account
          </p>
          <div>Enter your email below to sign in or use the below services</div>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid grid-cols-2 gap-6'>
            <Button
              variant='outline'
              onClick={() => handleOAuthSignIn('github')}
            >
              <Icons.gitHub className='mr-2 h-4 w-4' />
              Github
            </Button>
            <Button
              variant='outline'
              onClick={() => handleOAuthSignIn('google')}
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
        <div>
          <Button
            variant='secondary'
            className='w-full bg-black text-white hover:text-black'
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
