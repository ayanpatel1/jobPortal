import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/contant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId: selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("https://jobportal-1-qfkx.onrender.com/api/v1/job/post", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Post New Job</h1>
                    
                    <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Column 1 */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-gray-700">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Description</Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Requirements</Label>
                                    <Input
                                        type="text"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Salary</Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            
                            {/* Column 2 */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-gray-700">Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Job Type</Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Experience Level</Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Number of Positions</Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <Label className="text-gray-700">Company</Label>
                                    {companies.length > 0 ? (
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-blue-500">
                                                <SelectValue placeholder="Select a Company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {companies.map((company) => (
                                                        <SelectItem 
                                                            key={company._id}
                                                            value={company.name.toLowerCase()}
                                                        >
                                                            {company.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-xs text-red-600 mt-1">
                                            *Please register a company first
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            {loading ? (
                                <Button className="w-full" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={companies.length === 0}
                                >
                                    Post New Job
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob

