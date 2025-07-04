import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card