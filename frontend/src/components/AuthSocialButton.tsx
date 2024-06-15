import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onclick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onclick,
}) => {
  return (
    <button
      type='button'
      onClick={onclick}
      className='inline-flex w-full justify-center border border-slate-700 rounded-md bg-slate-800 px-4 py-2 text-slate-400 shadow-sm hover:bg-slate-700 focus:outline-none transition'
    >
      <Icon className='w-6 h-6' />
    </button>
  );
};

export default AuthSocialButton;
