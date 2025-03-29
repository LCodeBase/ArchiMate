import React from 'react';

interface FormInputProps {
  label: string;
  type: 'text' | 'number' | 'email' | 'select';
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  options?: { value: string; label: string }[];
  helpText?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  options,
  helpText,
  required = false,
  className = '',
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <select
          className={`w-full px-3 py-2 bg-white border ${error ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-black`}
          value={value}
          onChange={handleChange}
          required={required}
        >
          <option value="" disabled>
            {placeholder || 'Selecione uma opção'}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className={`w-full px-3 py-2 bg-white border ${error ? 'border-error' : 'border-neutral-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-black`}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required={required}
        />
      )}

      {helpText && <p className="mt-1 text-sm text-neutral-500">{helpText}</p>}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormInput;