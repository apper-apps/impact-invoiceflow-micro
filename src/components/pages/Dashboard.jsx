import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import StatusBadge from '@/components/molecules/StatusBadge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { invoiceService } from '@/services/api/invoiceService'

const Dashboard = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadInvoices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await invoiceService.getAll()
      setInvoices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadInvoices()
  }, [])
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadInvoices} />
  
  const stats = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'sent').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  }
  
  const recentInvoices = invoices
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
  
  const statCards = [
    {
      title: 'Total Invoices',
      value: stats.total,
      icon: 'FileText',
      color: 'primary',
      change: '+12% from last month'
    },
    {
      title: 'Paid Invoices',
      value: stats.paid,
      icon: 'CheckCircle',
      color: 'success',
      change: '+8% from last month'
    },
    {
      title: 'Pending Payment',
      value: stats.pending,
      icon: 'Clock',
      color: 'warning',
      change: '+5% from last month'
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: 'AlertCircle',
      color: 'error',
      change: '-2% from last month'
    }
  ]
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your invoices.</p>
        </div>
        <Link to="/invoices/new" className="btn-primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Invoice
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                  <ApperIcon name={stat.icon} size={24} className={`text-${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Revenue</span>
              <span className="text-2xl font-bold text-slate-900">${stats.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Paid Amount</span>
              <span className="text-xl font-semibold text-success">${stats.paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Outstanding</span>
              <span className="text-xl font-semibold text-warning">${(stats.totalAmount - stats.paidAmount).toFixed(2)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalAmount > 0 ? (stats.paidAmount / stats.totalAmount) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/invoices/new" 
              className="flex items-center p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <ApperIcon name="Plus" size={20} className="text-primary mr-3" />
              <span className="text-slate-900 font-medium">Create New Invoice</span>
            </Link>
            <Link 
              to="/invoices" 
              className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ApperIcon name="FileText" size={20} className="text-slate-600 mr-3" />
              <span className="text-slate-900 font-medium">View All Invoices</span>
            </Link>
            <Link 
              to="/settings" 
              className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ApperIcon name="Settings" size={20} className="text-slate-600 mr-3" />
              <span className="text-slate-900 font-medium">API Settings</span>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Recent Invoices */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Recent Invoices</h3>
          <Link to="/invoices" className="text-primary hover:text-primary/80 font-medium">
            View All
          </Link>
        </div>
        
        {recentInvoices.length === 0 ? (
          <Empty
            title="No invoices yet"
            description="Create your first invoice to get started"
            actionLabel="Create Invoice"
            onAction={() => window.location.href = '/invoices/new'}
            icon="Receipt"
          />
        ) : (
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <motion.div
                key={invoice.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <ApperIcon name="FileText" size={16} className="text-primary" />
                  </div>
                  <div>
                    <Link 
                      to={`/invoices/${invoice.Id}`}
                      className="font-medium text-slate-900 hover:text-primary"
                    >
                      {invoice.invoiceNumber}
                    </Link>
                    <p className="text-sm text-slate-600">{invoice.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">${invoice.total.toFixed(2)}</p>
                    <p className="text-sm text-slate-600">{format(new Date(invoice.dueDate), 'MMM dd')}</p>
                  </div>
                  <StatusBadge status={invoice.status} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default Dashboard