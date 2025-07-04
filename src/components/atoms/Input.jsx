import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`form-input ${error ? 'border-error ring-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input