import { useState, useEffect } from 'react'
import { invoiceService } from '@/services/api/invoiceService'

export const useInvoices = () => {
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
  
  const createInvoice = async (invoiceData) => {
    const newInvoice = await invoiceService.create(invoiceData)
    setInvoices(prev => [...prev, newInvoice])
    return newInvoice
  }
  
  const updateInvoice = async (id, invoiceData) => {
    const updatedInvoice = await invoiceService.update(id, invoiceData)
    setInvoices(prev => prev.map(inv => inv.Id === id ? updatedInvoice : inv))
    return updatedInvoice
  }
  
  const deleteInvoice = async (id) => {
    await invoiceService.delete(id)
    setInvoices(prev => prev.filter(inv => inv.Id !== id))
  }
  
  return {
    invoices,
    loading,
    error,
    loadInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice
  }
}