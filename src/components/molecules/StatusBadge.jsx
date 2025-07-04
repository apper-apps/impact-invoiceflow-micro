import Badge from '@/components/atoms/Badge'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    draft: { variant: 'default', icon: 'FileText', text: 'Draft' },
    sent: { variant: 'info', icon: 'Send', text: 'Sent' },
    paid: { variant: 'success', icon: 'CheckCircle', text: 'Paid' },
    overdue: { variant: 'error', icon: 'AlertCircle', text: 'Overdue' }
  }
  
  const config = statusConfig[status] || statusConfig.draft
  
  return (
    <Badge 
      variant={config.variant} 
      icon={config.icon}
    >
      {config.text}
    </Badge>
  )
}

export default StatusBadge