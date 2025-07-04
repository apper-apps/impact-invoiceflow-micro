import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'BarChart3' },
    { name: 'Invoices', href: '/invoices', icon: 'FileText' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }
  
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-slate-200">
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-primary to-secondary">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Receipt" size={28} className="text-white" />
              <span className="text-xl font-bold text-white font-display">InvoiceFlow</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ApperIcon name={item.icon} size={18} className="mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-primary to-secondary">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Receipt" size={28} className="text-white" />
                  <span className="text-xl font-bold text-white font-display">InvoiceFlow</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-slate-200"
                >
                  <ApperIcon name="X" size={24} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ApperIcon name={item.icon} size={18} className="mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900"
            >
              <ApperIcon name="Menu" size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <Link
                to="/invoices/new"
                className="btn-primary"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                New Invoice
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout