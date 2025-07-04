import { forwardRef } from 'react'

const Select = forwardRef(({ 
  label, 
  error, 
  options = [], 
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
      <select
        ref={ref}
        className={`form-input ${error ? 'border-error ring-error' : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select