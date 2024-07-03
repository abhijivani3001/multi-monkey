import { MailCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmailVerifiedSuccessfully = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className='msg-title'>
        <MailCheck className='h-10 w-10 md:h-20 md:w-20' />
        <h1 className='text-xl md:text-2xl text-center'>
          Email verified successfully
        </h1>
        <button onClick={handleNavigateLogin} className='btn mt-10'>
          Login
        </button>
      </div>
    </>
  );
};

export default EmailVerifiedSuccessfully;
