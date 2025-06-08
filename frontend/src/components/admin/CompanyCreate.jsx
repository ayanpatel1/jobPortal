import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/contant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='bg-white rounded-lg shadow-sm p-8'>
                    <div className='mb-8'>
                        <h1 className='font-bold text-2xl text-gray-800'>Your Company Name</h1>
                        <p className='text-gray-500 mt-2'>What would you like to name your company? You can change this later.</p>
                    </div>
    
                    <div className="space-y-2">
                        <Label className="text-gray-700">Company Name</Label>
                        <Input
                            type="text"
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                            placeholder="e.g., JobHunt, Microsoft, etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
    
                    <div className='flex items-center justify-end gap-3 mt-10'>
                        <Button 
                            variant="outline" 
                            className='border-gray-300 text-gray-700 hover:bg-gray-100'
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={registerNewCompany} 
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
