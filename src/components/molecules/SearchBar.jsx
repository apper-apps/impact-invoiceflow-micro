import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }
  
  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        size={16} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  )
}

export default SearchBar