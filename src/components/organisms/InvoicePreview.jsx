import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const InvoicePreview = ({ invoice, onEdit }) => {
  const handlePrint = () => {
    window.print()
  }
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    console.log('Downloading PDF...')
  }
  
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end space-x-4 mb-6 no-print">
          <Button variant="outline" onClick={handlePrint}>
            <ApperIcon name="Printer" size={16} className="mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <ApperIcon name="Download" size={16} className="mr-2" />
            Download PDF
          </Button>
          <Button onClick={onEdit}>
            <ApperIcon name="Edit2" size={16} className="mr-2" />
            Edit
          </Button>
        </div>
        
        {/* Invoice */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 print:border-0 print:shadow-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Receipt" size={32} className="text-primary" />
                <h1 className="text-3xl font-bold text-slate-900 font-display">InvoiceFlow</h1>
              </div>
              <p className="text-slate-600">Professional Invoice Management</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">INVOICE</h2>
              <p className="text-slate-600">#{invoice.invoiceNumber}</p>
            </div>
          </div>
          
          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Bill To:</h3>
              <div className="text-slate-600">
                <p className="font-medium text-slate-900">{invoice.clientName}</p>
                <p>{invoice.clientEmail}</p>
                <p className="whitespace-pre-line">{invoice.clientAddress}</p>
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Issue Date:</span>
                  <span className="text-slate-900">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Due Date:</span>
                  <span className="text-slate-900">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Line Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 text-slate-900 font-semibold">Description</th>
                  <th className="text-right py-3 text-slate-900 font-semibold">Qty</th>
                  <th className="text-right py-3 text-slate-900 font-semibold">Rate</th>
                  <th className="text-right py-3 text-slate-900 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-3 text-slate-900">{item.description}</td>
                    <td className="py-3 text-right text-slate-600">{item.quantity}</td>
                    <td className="py-3 text-right text-slate-600">${item.rate.toFixed(2)}</td>
                    <td className="py-3 text-right text-slate-900 font-medium">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="text-slate-900">${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax ({invoice.tax}%):</span>
                  <span className="text-slate-900">${(invoice.subtotal * (invoice.tax / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-slate-200 pt-2">
                  <span className="text-slate-900">Total:</span>
                  <span className="text-primary">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {invoice.notes && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Notes</h3>
              <p className="text-slate-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview