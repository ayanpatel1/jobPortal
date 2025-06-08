
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/contant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: null
    });

    const [preview, setPreview] = useState(null);
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if (!input.fullname.trim()) {
            toast.error("Full name is required!");
            return;
        }

        if (!emailRegex.test(input.email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        if (!phoneRegex.test(input.phoneNumber)) {
            toast.error("Please enter a valid phone number!");
            return;
        }

        if (!passwordRegex.test(input.password)) {
            toast.error("Password must be at least 6 characters and include a number!");
            return;
        }

        if (!input.role) {
            toast.error("Please select a role!");
            return;
        }

        if (!input.file) {
            toast.error("Please upload a profile picture!");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(input.file.type)) {
            toast.error("Only JPG, PNG, and WEBP files are allowed!");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post("https://jobportal-1-qfkx.onrender.com/api/v1/user/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
            <Navbar />
            <div className="flex justify-center items-center py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                            <p className="text-gray-600">Join our community to find your dream job or talent</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-gray-700 mb-2 block">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="text"
                                            value={input.fullname}
                                            name="fullname"
                                            onChange={changeEventHandler}
                                            placeholder="John Doe"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-gray-700 mb-2 block">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            value={input.email}
                                            name="email"
                                            onChange={changeEventHandler}
                                            placeholder="john@example.com"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-gray-700 mb-2 block">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="tel"
                                            value={input.phoneNumber}
                                            name="phoneNumber"
                                            onChange={changeEventHandler}
                                            placeholder="+1 234 567 890"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-gray-700 mb-2 block">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="password"
                                            value={input.password}
                                            name="password"
                                            onChange={changeEventHandler}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-gray-700 block">Register As</Label>
                                <div className="flex space-x-6">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === "student"}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">Student</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === "recruiter"}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 block">Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <Upload className="h-6 w-6" />
                                                <span className="text-xs mt-1">Upload</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={changeFileHandler}
                                            className="hidden"
                                        />
                                    </label>
                                    <span className="text-sm text-gray-500">Click to upload profile photo</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                {loading ? (
                                    <Button className="w-full" disabled>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </Button>
                                ) : (
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11">
                                            Sign Up
                                        </Button>
                                    </motion.div>
                                )}
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
