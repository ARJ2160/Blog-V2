'use client';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Icons } from '../components/icons';
import { FaGoogle } from 'react-icons/fa';
import { Input } from '../components/ui/input';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { SessionTypes } from '../lib/types';

const SignIn = (): JSX.Element => {
  const { data: session }: SessionTypes = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOAuthSignIn = (type: string) => {
    signIn(type, { callbackUrl: '/' });
  };
  // const handleSignIn = () => {
  //   const signInParams = { email, password };
  //   fetch((process.env.NEXT_PUBLIC_BACKEND_URL + '/users/signin') as string, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(signInParams),
  //     mode: 'no-cors'
  //   }).then(res => {
  //     if (res.status === 200) {
  //       // redirect("/")
  //       // history.push('/');
  //     } else if (res.status === 422) {
  //       window.alert('Wrong Password');
  //     }
  //   });
  // };
  return (
    <div className='flex justify-center'>
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
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
