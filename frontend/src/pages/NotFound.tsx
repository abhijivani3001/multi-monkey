import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='error-msg'>
      <div className='text-3xl'>404 - Page not found!</div>
      <button onClick={handleHomeClick} className='btn'>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
