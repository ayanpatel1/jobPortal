

import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { X, Filter } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        icon: "📍"
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
        icon: "💼"
    },
    {
        filterType: "Salary",
        options: ["0-40k", "42k-1L", "1L-5L"],
        icon: "💰"
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value === selectedValue ? '' : value) // Toggle selection
    }

    const clearFilters = () => {
        setSelectedValue('')
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    return (
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'w-full' : 'w-full md:w-auto'}`}>
            {/* Mobile Header */}
            <div 
                className="md:hidden flex items-center justify-between p-4 bg-blue-50 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-blue-600" />
                    <h2 className="font-semibold text-blue-600">Filters</h2>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </motion.div>
            </div>

            {/* Filter Content */}
            <div className={`${isExpanded ? 'block' : 'hidden md:block'} p-4`}>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-gray-800">Filter Jobs</h1>
                    {selectedValue && (
                        <button 
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </button>
                    )}
                </div>

                <hr className="mb-4 border-gray-200" />

                <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                    {filterData.map((data, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">{data.icon}</span>
                                <h2 className="font-semibold text-gray-700">{data.filterType}</h2>
                            </div>
                            <div className="space-y-2 ml-7">
                                {data.options.map((item, idx) => {
                                    const itemId = `filter-${index}-${idx}`
                                    return (
                                        <motion.div 
                                            key={itemId}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center space-x-3"
                                        >
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId}
                                                className="h-5 w-5 border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <Label 
                                                htmlFor={itemId} 
                                                className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                                            >
                                                {item}
                                            </Label>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard