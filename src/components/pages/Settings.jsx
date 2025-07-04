import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const Settings = () => {
  const [apiConfig, setApiConfig] = useState({
    provider: '',
    apiKey: '',
    isValid: false
  })
  const [testingConnection, setTestingConnection] = useState(false)
  
  useEffect(() => {
    // Load saved API configuration
    const savedConfig = localStorage.getItem('invoiceflow-api-config')
    if (savedConfig) {
      try {
        setApiConfig(JSON.parse(savedConfig))
      } catch (err) {
        console.error('Failed to parse saved API config:', err)
      }
    }
  }, [])
  
  const handleInputChange = (field, value) => {
    setApiConfig(prev => ({
      ...prev,
      [field]: value,
      isValid: false // Reset validation status when config changes
    }))
  }
  
  const handleTestConnection = async () => {
    if (!apiConfig.provider || !apiConfig.apiKey) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setTestingConnection(true)
    
    try {
      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, this would make an actual API call to validate the key
      const isValid = apiConfig.apiKey.length >= 20 // Simple validation
      
      setApiConfig(prev => ({
        ...prev,
        isValid
      }))
      
      if (isValid) {
        toast.success('API connection successful!')
      } else {
        toast.error('Invalid API key. Please check your credentials.')
      }
    } catch (err) {
      toast.error('Failed to test API connection')
    } finally {
      setTestingConnection(false)
    }
  }
  
  const handleSave = () => {
    if (!apiConfig.provider || !apiConfig.apiKey) {
      toast.error('Please fill in all required fields')
      return
    }
    
    localStorage.setItem('invoiceflow-api-config', JSON.stringify(apiConfig))
    toast.success('API configuration saved successfully')
  }
  
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the API configuration?')) {
      setApiConfig({
        provider: '',
        apiKey: '',
        isValid: false
      })
      localStorage.removeItem('invoiceflow-api-config')
      toast.success('API configuration cleared')
    }
  }
  
  const providerOptions = [
    { value: '', label: 'Select Provider' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'square', label: 'Square' },
    { value: 'custom', label: 'Custom API' }
  ]
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-display">Settings</h1>
        <p className="text-slate-600 mt-1">Configure your API integration and preferences</p>
      </div>
      
      {/* API Configuration */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">API Configuration</h3>
            <p className="text-slate-600">Configure your payment provider API integration</p>
          </div>
          {apiConfig.isValid && (
            <Badge variant="success" icon="CheckCircle">
              Connected
            </Badge>
          )}
        </div>
        
        <div className="space-y-4">
          <FormField
            type="select"
            label="API Provider"
            value={apiConfig.provider}
            onChange={(e) => handleInputChange('provider', e.target.value)}
            options={providerOptions}
            required
          />
          
          <FormField
            label="API Key"
            type="password"
            value={apiConfig.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
            placeholder="Enter your API key"
            required
          />
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleTestConnection}
              loading={testingConnection}
              variant="outline"
            >
              <ApperIcon name="Zap" size={16} className="mr-2" />
              Test Connection
            </Button>
            <Button onClick={handleSave}>
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Configuration
            </Button>
            <Button onClick={handleClear} variant="ghost">
              <ApperIcon name="Trash2" size={16} className="mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </Card>
      
      {/* API Information */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">API Integration Benefits</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 rounded-full p-2 mt-1">
              <ApperIcon name="CreditCard" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Payment Processing</h4>
              <p className="text-slate-600 text-sm">Accept payments directly through your invoices</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-secondary/10 rounded-full p-2 mt-1">
              <ApperIcon name="Users" size={16} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Client Management</h4>
              <p className="text-slate-600 text-sm">Sync client information and payment history</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-accent/10 rounded-full p-2 mt-1">
              <ApperIcon name="BarChart" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Analytics</h4>
              <p className="text-slate-600 text-sm">Track payment trends and generate reports</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-success/10 rounded-full p-2 mt-1">
              <ApperIcon name="Zap" size={16} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Automation</h4>
              <p className="text-slate-600 text-sm">Automate follow-ups and payment reminders</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* App Information */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-600">Version</span>
            <span className="text-slate-900 font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Last Updated</span>
            <span className="text-slate-900 font-medium">December 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Storage</span>
            <span className="text-slate-900 font-medium">Local Storage</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Settings