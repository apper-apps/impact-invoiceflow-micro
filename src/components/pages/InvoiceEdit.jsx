import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import InvoiceForm from '@/components/organisms/InvoiceForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { invoiceService } from '@/services/api/invoiceService'

const InvoiceEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadInvoice = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await invoiceService.getById(parseInt(id))
      setInvoice(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadInvoice()
  }, [id])
  
  const handleSave = async (invoiceData) => {
    try {
      await invoiceService.update(parseInt(id), invoiceData)
      toast.success('Invoice updated successfully')
      navigate(`/invoices/${id}`)
    } catch (err) {
      toast.error('Failed to update invoice')
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadInvoice} />
  if (!invoice) return <Error message="Invoice not found" />
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">Edit Invoice</h1>
        <p className="text-slate-600 mt-1">Edit invoice #{invoice.invoiceNumber}</p>
      </div>
      
      <InvoiceForm 
        invoice={invoice}
        onSave={handleSave} 
      />
    </div>
  )
}

export default InvoiceEdit