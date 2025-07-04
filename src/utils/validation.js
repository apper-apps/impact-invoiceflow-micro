export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateInvoice = (invoice) => {
  const errors = {}
  
  if (!invoice.invoiceNumber) {
    errors.invoiceNumber = 'Invoice number is required'
  }
  
  if (!invoice.clientName) {
    errors.clientName = 'Client name is required'
  }
  
  if (!invoice.clientEmail) {
    errors.clientEmail = 'Client email is required'
  } else if (!validateEmail(invoice.clientEmail)) {
    errors.clientEmail = 'Invalid email format'
  }
  
  if (!invoice.clientAddress) {
    errors.clientAddress = 'Client address is required'
  }
  
  if (!invoice.issueDate) {
    errors.issueDate = 'Issue date is required'
  }
  
  if (!invoice.dueDate) {
    errors.dueDate = 'Due date is required'
  }
  
  if (!invoice.lineItems || invoice.lineItems.length === 0) {
    errors.lineItems = 'At least one line item is required'
  } else {
    invoice.lineItems.forEach((item, index) => {
      if (!item.description) {
        errors[`lineItem${index}Description`] = 'Description is required'
      }
      if (!item.quantity || item.quantity <= 0) {
        errors[`lineItem${index}Quantity`] = 'Quantity must be greater than 0'
      }
      if (!item.rate || item.rate <= 0) {
        errors[`lineItem${index}Rate`] = 'Rate must be greater than 0'
      }
    })
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}