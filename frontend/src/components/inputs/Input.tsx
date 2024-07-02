import clsx from 'clsx';
import { forwardRef } from 'react';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = 'text',
      placeholder,
      required,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label
          htmlFor={id}
          className='block mb-2 text-sm font-medium text-slate-100'
        >
          {label}
        </label>
        <input
          {...props}
          id={id}
          ref={ref}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={clsx(
            'border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-slate-100 focus:ring-0 focus:outline-none autofill-text autofill-bg caret-white',
            disabled && 'bg-slate-100 opacity-50 cursor-not-allowed'
          )}
          onChange={onChange}
          autoComplete={id}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
