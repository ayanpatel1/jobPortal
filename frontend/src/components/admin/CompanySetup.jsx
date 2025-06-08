import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/contant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-xl mx-auto px-4 py-8">
            <form onSubmit={submitHandler} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  onClick={() => navigate("/admin/companies")} 
                  variant="outline" 
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
              </div>
      
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">Company Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="bg-gray-50 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>
      
                <div className="space-y-2">
                  <Label className="text-gray-700">Description *</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="bg-gray-50 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>
      
                <div className="space-y-2">
                  <Label className="text-gray-700">Website</Label>
                  <Input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="bg-gray-50 border-gray-200 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
      
                <div className="space-y-2">
                  <Label className="text-gray-700">Location *</Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="bg-gray-50 border-gray-200 focus:border-blue-500"
                    required
                  />
                </div>
      
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-700">Company Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-50"
                  />
                </div>
              </div>
      
              <div className="mt-8">
                {loading ? (
                  <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update Company
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )
}

export default CompanySetup