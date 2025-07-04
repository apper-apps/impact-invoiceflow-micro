import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

const InvoiceForm = ({ invoice, onSave }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    issueDate: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    lineItems: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    tax: 0,
    notes: ''
  })
  
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    if (invoice) {
      setFormData(invoice)
    }
  }, [invoice])
  
  useEffect(() => {
    const newSubtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0)
    const taxAmount = newSubtotal * (formData.tax / 100)
    const newTotal = newSubtotal + taxAmount
    
    setSubtotal(newSubtotal)
    setTotal(newTotal)
  }, [formData.lineItems, formData.tax])
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...formData.lineItems]
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [field]: value
    }
    
    if (field === 'quantity' || field === 'rate') {
      updatedLineItems[index].amount = updatedLineItems[index].quantity * updatedLineItems[index].rate
    }
    
    setFormData(prev => ({
      ...prev,
      lineItems: updatedLineItems
    }))
  }
  
  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }))
  }
  
  const removeLineItem = (index) => {
    if (formData.lineItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        lineItems: prev.lineItems.filter((_, i) => i !== index)
      }))
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      subtotal,
      total
    })
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Invoice Details */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Invoice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Invoice Number"
            value={formData.invoiceNumber}
            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
            required
          />
          <FormField
            label="Issue Date"
            type="date"
            value={formData.issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
            required
          />
          <FormField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            required
          />
        </div>
      </div>
      
      {/* Client Information */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Client Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Client Name"
            value={formData.clientName}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            required
          />
          <FormField
            label="Client Email"
            type="email"
            value={formData.clientEmail}
            onChange={(e) => handleInputChange('clientEmail', e.target.value)}
            required
          />
          <div className="md:col-span-2">
            <FormField
              label="Client Address"
              value={formData.clientAddress}
              onChange={(e) => handleInputChange('clientAddress', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      
      {/* Line Items */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Line Items</h3>
          <Button
            type="button"
            variant="outline"
            onClick={addLineItem}
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.lineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-slate-200 rounded-lg"
            >
              <div className="md:col-span-5">
                <FormField
                  label="Description"
                  value={item.description}
                  onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Quantity"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => handleLineItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Amount"
                  type="number"
                  value={item.amount.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLineItem(index)}
                  disabled={formData.lineItems.length === 1}
                  className="text-error hover:text-error/80"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Totals */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Totals</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormField
                label="Tax Rate (%)"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.tax}
                onChange={(e) => handleInputChange('tax', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax ({formData.tax}%):</span>
              <span className="font-medium">${(subtotal * (formData.tax / 100)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-slate-200 pt-2">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notes */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notes</h3>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows="4"
          placeholder="Add any additional notes or terms..."
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="submit" size="lg">
          <ApperIcon name="Save" size={16} className="mr-2" />
          Save Invoice
        </Button>
      </div>
    </form>
  )
}

export default InvoiceForm