import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import InvoiceList from '@/components/pages/InvoiceList'
import InvoiceCreate from '@/components/pages/InvoiceCreate'
import InvoiceEdit from '@/components/pages/InvoiceEdit'
import InvoiceView from '@/components/pages/InvoiceView'
import Settings from '@/components/pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/invoices/new" element={<InvoiceCreate />} />
          <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />
          <Route path="/invoices/:id" element={<InvoiceView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </div>
  )
}

export default App