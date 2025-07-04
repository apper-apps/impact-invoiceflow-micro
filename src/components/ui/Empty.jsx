import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = 'No data found',
  description = 'Get started by creating your first item',
  actionLabel = 'Create New',
  onAction,
  icon = 'FileText'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={48} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6 text-center max-w-md">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty