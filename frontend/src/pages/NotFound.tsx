import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='msg-title'>
      <div className='text-xl md:text-3xl text-center'>
        404 - Page not found!
      </div>
      <button onClick={handleNavigateHome} className='btn mt-10'>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
