import { logoutUser } from '@/api/users/user.api';
import { account } from '@/config/appwrite/appwriteConfig';
import { accountType } from '@/constants/account.constant';
import { useAuthContext } from '@/context/Auth/AuthContext';
import { LogOut, User2 } from 'lucide-react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuth, setIsAuth, setUser, user } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    if (user && user.accountType !== accountType.LOCAL) {
      await account.deleteSession('current');
    }

    await logoutUser();

    localStorage.removeItem('token');
    setIsAuth(false);
    setUser(null);

    navigate('/login', { replace: true });
    toast.success('Logged out successfully');
  }, [navigate, setIsAuth, setUser, user]);

  return (
    <nav className='z-30 w-full sticky top-0 backdrop-blur-lg'>
      <div className='flex items-center justify-between mx-auto py-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/logos/logo-base-1200x1200.png'
            className='h-10 w-10 md:h-12 md:w-12 object-contain'
          />
          <span className='hidden md:block font-poppins self-center text-3xl md:text-4xl my-auto font-semibold whitespace-nowrap'>
            <span className='text-white'>multi</span>
            <span className='bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text text-transparent'>
              monkey
            </span>
          </span>
        </Link>
        <div className='flex md:order-2 gap-4 text-slate-400'>
          <Link
            to={'/profile'}
            className='relative w-full hover:text-slate-100'
          >
            <User2 className='h-6 w-6' />
          </Link>
          {isAuth && (
            <button
              onClick={logoutHandler}
              className='relative w-full hover:text-slate-100'
            >
              <LogOut className='h-6 w-6' />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
