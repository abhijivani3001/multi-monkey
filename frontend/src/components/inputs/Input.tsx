import clsx from 'clsx';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  required,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-100'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={clsx(
          `border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:ring-0 focus:outline-none`,
          disabled && 'bg-gray-100 opacity-50 cursor-not-allowed'
        )}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
