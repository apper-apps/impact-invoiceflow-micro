import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import StatusBadge from '@/components/molecules/StatusBadge'
import Button from '@/components/atoms/Button'

const InvoiceTable = ({ invoices, onDelete }) => {
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const sortedInvoices = [...invoices].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ApperIcon name="ArrowUpDown" size={14} className="text-slate-400" />
    return sortDirection === 'asc' ? 
      <ApperIcon name="ArrowUp" size={14} className="text-primary" /> : 
      <ApperIcon name="ArrowDown" size={14} className="text-primary" />
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th 
              className="text-left py-3 px-4 font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleSort('invoiceNumber')}
            >
              <div className="flex items-center space-x-2">
                <span>Invoice #</span>
                <SortIcon field="invoiceNumber" />
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleSort('clientName')}
            >
              <div className="flex items-center space-x-2">
                <span>Client</span>
                <SortIcon field="clientName" />
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleSort('total')}
            >
              <div className="flex items-center space-x-2">
                <span>Amount</span>
                <SortIcon field="total" />
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handleSort('dueDate')}
            >
              <div className="flex items-center space-x-2">
                <span>Due Date</span>
                <SortIcon field="dueDate" />
              </div>
            </th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedInvoices.map((invoice) => (
            <motion.tr
              key={invoice.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <td className="py-4 px-4">
                <Link 
                  to={`/invoices/${invoice.Id}`} 
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {invoice.invoiceNumber}
                </Link>
              </td>
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium text-slate-900">{invoice.clientName}</div>
                  <div className="text-sm text-slate-500">{invoice.clientEmail}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-slate-900">
                  ${invoice.total.toFixed(2)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-slate-600">
                  {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
                </span>
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={invoice.status} />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/invoices/${invoice.Id}`}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="View Invoice"
                  >
                    <ApperIcon name="Eye" size={18} />
                  </Link>
                  <Link
                    to={`/invoices/${invoice.Id}/edit`}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Edit Invoice"
                  >
                    <ApperIcon name="Edit2" size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(invoice.Id)}
                    className="text-slate-400 hover:text-error transition-colors"
                    title="Delete Invoice"
                  >
                    <ApperIcon name="Trash2" size={18} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceTable