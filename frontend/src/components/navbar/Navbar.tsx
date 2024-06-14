import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='border-gray-800 bg-gray-900 z-30 w-full shadow-lg sticky top-0'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4 my-auto'>
        <Link
          to={'/'}
          className='flex focus:outline-none items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='/logos/logo-base-1200x1200.png'
            className='h-12 w-12 object-contain'
          />
          <span className='hidden md:block self-center text-3xl my-auto font-semibold whitespace-nowrap text-gray-100'>
            <span>Multi</span>
            <span className='bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-transparent'>
              Monkey
            </span>
          </span>
        </Link>
        <div className='flex md:order-2 gap-4 text-gray-400'>
          <Link to={'/profile'} className='relative w-full hover:text-gray-100'>
            username
          </Link>
          <div className='relative w-full'>logout</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
