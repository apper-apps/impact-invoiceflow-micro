import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import InvoiceForm from '@/components/organisms/InvoiceForm'
import { invoiceService } from '@/services/api/invoiceService'

const InvoiceCreate = () => {
  const navigate = useNavigate()
  
  const handleSave = async (invoiceData) => {
    try {
      const newInvoice = await invoiceService.create({
        ...invoiceData,
        status: 'draft',
        createdAt: new Date().toISOString()
      })
      
      toast.success('Invoice created successfully')
      navigate(`/invoices/${newInvoice.Id}`)
    } catch (err) {
      toast.error('Failed to create invoice')
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">Create Invoice</h1>
        <p className="text-slate-600 mt-1">Create a new professional invoice</p>
      </div>
      
      <InvoiceForm onSave={handleSave} />
    </div>
  )
}

export default InvoiceCreate