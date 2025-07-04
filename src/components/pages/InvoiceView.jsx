import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import InvoicePreview from '@/components/organisms/InvoicePreview'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { invoiceService } from '@/services/api/invoiceService'

const InvoiceView = () => {
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
  
  const handleEdit = () => {
    navigate(`/invoices/${id}/edit`)
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadInvoice} />
  if (!invoice) return <Error message="Invoice not found" />
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">Invoice #{invoice.invoiceNumber}</h1>
        <p className="text-slate-600 mt-1">View and manage your invoice</p>
      </div>
      
      <InvoicePreview 
        invoice={invoice}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default InvoiceView