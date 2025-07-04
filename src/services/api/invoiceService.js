import mockInvoices from '@/services/mockData/invoices.json'

class InvoiceService {
  constructor() {
    this.storageKey = 'invoiceflow-invoices'
    this.initializeData()
  }
  
  initializeData() {
    const existing = localStorage.getItem(this.storageKey)
    if (!existing) {
      localStorage.setItem(this.storageKey, JSON.stringify(mockInvoices))
    }
  }
  
  getData() {
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error parsing invoice data:', error)
      return []
    }
  }
  
  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }
  
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.getData()])
      }, 300)
    })
  }
  
  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const invoices = this.getData()
        const invoice = invoices.find(inv => inv.Id === id)
        if (invoice) {
          resolve({ ...invoice })
        } else {
          reject(new Error('Invoice not found'))
        }
      }, 200)
    })
  }
  
  async create(invoice) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const invoices = this.getData()
        const maxId = Math.max(...invoices.map(inv => inv.Id), 0)
        const newInvoice = {
          ...invoice,
          Id: maxId + 1
        }
        invoices.push(newInvoice)
        this.saveData(invoices)
        resolve({ ...newInvoice })
      }, 400)
    })
  }
  
  async update(id, invoice) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const invoices = this.getData()
        const index = invoices.findIndex(inv => inv.Id === id)
        if (index !== -1) {
          invoices[index] = { ...invoice, Id: id }
          this.saveData(invoices)
          resolve({ ...invoices[index] })
        } else {
          reject(new Error('Invoice not found'))
        }
      }, 400)
    })
  }
  
  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const invoices = this.getData()
        const index = invoices.findIndex(inv => inv.Id === id)
        if (index !== -1) {
          invoices.splice(index, 1)
          this.saveData(invoices)
          resolve()
        } else {
          reject(new Error('Invoice not found'))
        }
      }, 300)
    })
  }
}

export const invoiceService = new InvoiceService()