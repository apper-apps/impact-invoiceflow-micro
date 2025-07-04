import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import InvoiceTable from '@/components/organisms/InvoiceTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { invoiceService } from '@/services/api/invoiceService'

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const loadInvoices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await invoiceService.getAll()
      setInvoices(data)
      setFilteredInvoices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadInvoices()
  }, [])
  
  useEffect(() => {
    let filtered = invoices
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter)
    }
    
    setFilteredInvoices(filtered)
  }, [invoices, statusFilter])
  
  const handleSearch = (searchTerm) => {
    let filtered = invoices
    
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter)
    }
    
    setFilteredInvoices(filtered)
  }
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoiceService.delete(id)
        setInvoices(prev => prev.filter(invoice => invoice.Id !== id))
        toast.success('Invoice deleted successfully')
      } catch (err) {
        toast.error('Failed to delete invoice')
      }
    }
  }
  
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ]
  
  if (loading) return <Loading type="table" />
  if (error) return <Error message={error} onRetry={loadInvoices} />
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Invoices</h1>
          <p className="text-slate-600 mt-1">Manage and track all your invoices</p>
        </div>
        <Link to="/invoices/new" className="btn-primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Invoice
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search invoices..." 
            />
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Invoice Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {filteredInvoices.length === 0 ? (
          <Empty
            title="No invoices found"
            description="Create your first invoice or adjust your filters"
            actionLabel="Create Invoice"
            onAction={() => window.location.href = '/invoices/new'}
            icon="Receipt"
          />
        ) : (
          <InvoiceTable 
            invoices={filteredInvoices}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default InvoiceList