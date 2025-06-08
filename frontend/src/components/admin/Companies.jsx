import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { Navigate, useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(setSearchCompanyByText(input));
    }, [input]);


    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="w-full md:w-64">
                <Input
                  className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Filter by company name..."
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <Button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                onClick={() => navigate("/admin/companies/create")}
              >
                + New Company
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <CompaniesTable />
            </div>
          </div>
        </div>
      )
}

export default Companies