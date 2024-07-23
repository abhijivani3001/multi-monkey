import { oAuthLogin } from '@/api/oauth/oauth';
import { loginUser } from '@/api/users/user.api';
import AuthSocialButton from '@/components/AuthSocialButton';
import Input from '@/components/inputs/Input';
import { account } from '@/config/appwrite/appwriteConfig';
import { accountType } from '@/constants/account.constant';
import { useAuthContext } from '@/context/Auth/AuthContext';
import { IUserResponse } from '@/interfaces/response/user.response';
import getEnvVar from '@/utils/getEnvVar';
import { zodResolver } from '@hookform/resolvers/zod';
import { OAuthProvider } from 'appwrite';
import { LogIn as LogInIcon } from 'lucide-react';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(255, { message: 'Password must be at most 255 characters long' }),
});

type LoginForm = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res: IUserResponse = await loginUser({
      email: data.email,
      password: data.password,
    });
    if (res.success) {
      toast.success(res.message);

      if (res.data.user?.verified) {
        localStorage.setItem('token', res.token);

        setIsAuth(true);
        navigate('/profile', { replace: true });
        
        // clear field values
        reset();
      }
    } else {
      toast.error(res.message);
    }
  };

  const handleLoginWithGoogle = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      await account.createOAuth2Session(
        OAuthProvider.Google,
        getEnvVar('VITE_OAUTH_SUCCESS_URL'), // success url
        getEnvVar('VITE_OAUTH_FAILURE_URL') // fail url
      );

      const user = await account.get();
      const session = await account.getSession('current');

      const res = await oAuthLogin({
        type: 'oauth',
        provider: accountType.GOOGLE,
        providerAccountId: user.$id,
        providerAccessToken: session.providerAccessToken,
        expires: session.expire,
        createdAt: session.$createdAt,
        updatedAt: session.$updatedAt,
        name: user.name,
        email: user.email,
        photo: user.prefs?.avatar,
        accountType: accountType.GOOGLE,
        verified: true,
      });

      if (res.success) {
        toast.success(res.message);

        if (res.data.user?.verified) {
          localStorage.setItem('token', res.data.token);
          navigate('/profile', { replace: true });
        }
      } else {
        toast.error(res.message);
      }
    },
    [navigate]
  );

  const handleLoginWithGithub = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      account.createOAuth2Session(
        OAuthProvider.Github,
        getEnvVar('VITE_OAUTH_SUCCESS_URL'), // success url
        getEnvVar('VITE_OAUTH_FAILURE_URL') // fail url
      );

      const user = await account.get();
      const session = await account.getSession('current');

      const res = await oAuthLogin({
        type: 'oauth',
        provider: accountType.GITHUB,
        providerAccountId: user.$id,
        providerAccessToken: session.providerAccessToken,
        expires: session.expire,
        createdAt: session.$createdAt,
        updatedAt: session.$updatedAt,
        name: user.name,
        email: user.email,
        photo: getEnvVar('VITE_GITHUB_PROFILE_URL') + '/' + session.providerUid,
        accountType: accountType.GITHUB,
        verified: true,
      });

      if (res.success) {
        toast.success(res.message);

        if (res.data.user?.verified) {
          localStorage.setItem('token', res.data.token);
          navigate('/profile', { replace: true });
        }
      } else {
        toast.error(res.message);
      }
    },
    [navigate]
  );

  return (
    <>
      <div className='flex flex-col w-full items-center justify-center pt-4 pb-6 mx-auto'>
        <div className='flex items-center gap-3 mb-4 text-xl md:text-2xl font-semibold text-slate-100'>
          <LogInIcon className='h-5 w-5 md:h-6 md:w-6' strokeWidth='2.5' />
          <span>Login</span>
        </div>
        <div className='w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-lg xl:p-0 bg-slate-900 border-slate-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <div className='space-y-2 md:space-y-3'>
                <Input
                  {...register('email')}
                  id='email'
                  type='email'
                  label='Email'
                  placeholder='name@company.com'
                  disabled={isSubmitting}
                />
                <span className={`${errors.email ? 'error-msg' : ''}`}>
                  {errors.email ? errors.email.message : <>&nbsp;</>}
                </span>
                <Input
                  {...register('password')}
                  id='password'
                  type='password'
                  label='Password'
                  placeholder='••••••••'
                  disabled={isSubmitting}
                />
                <span className={`${errors.password ? 'error-msg' : ''}`}>
                  {errors.password ? errors.password.message : <>&nbsp;</>}
                </span>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border rounded focus:ring-1 border-slate-600 focus:outline-none focus:border'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label htmlFor='remember' className='text-slate-300'>
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-slate-300 hover:underline text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`${isSubmitting ? 'btn-disabled' : 'btn'} w-full`}
                >
                  {isSubmitting ? 'Loading...' : 'Login'}
                </button>
              </div>

              <div className='space-y-3'>
                {/* oauth */}
                <div className='space-y-6'>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-slate-700' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                      <span className='bg-slate-900 px-2 text-slate-500'>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <AuthSocialButton
                      icon={BsGithub}
                      onClick={handleLoginWithGithub}
                    />
                    <AuthSocialButton
                      icon={BsGoogle}
                      onClick={handleLoginWithGoogle}
                    />
                  </div>
                </div>

                {/* change variant */}
                <p className='text-sm font-light text-slate-400'>
                  <span className='mr-1.5'>Don't have an account yet?</span>
                  <Link
                    to={'/signup'}
                    className='font-medium text-primary-600 hover:underline text-primary-500'
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
