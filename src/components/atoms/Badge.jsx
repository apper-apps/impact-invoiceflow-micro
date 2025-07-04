import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  icon, 
  className = '' 
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info'
  }
  
  return (
    <span className={`status-badge ${variants[variant]} ${className}`}>
      {icon && <ApperIcon name={icon} size={12} className="mr-1" />}
      {children}
    </span>
  )
}

export default Badge