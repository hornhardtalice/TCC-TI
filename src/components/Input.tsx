interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = ({ error, label, className = '', ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`appearance-none relative block w-full px-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
