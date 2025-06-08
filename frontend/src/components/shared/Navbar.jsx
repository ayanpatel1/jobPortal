


import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/contant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get("https://jobportal-1-qfkx.onrender.com/api/v1/user/logout", { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                <div>
                    <h1 className='text-3xl font-bold text-white hover:text-gray-200 transition-colors duration-300'>
                        Rozgaar<span className='text-yellow-300'>Express</span>
                    </h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Browse
                                        </Link>
                                    </li>
                                    {user && user.role === "student" && (
                                        <li>
                                            <Link to="/interview-dashboard" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                            Mock Interview
                                            </Link>
                                        </li>
                                    )}
                                </>
                            )
                        }
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-200">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="solid" className="rounded-full bg-yellow-300 text-blue-600 hover:bg-yellow-400 transition-colors duration-200">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 border-white hover:border-yellow-300 transition-all duration-300'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile photo" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 bg-white shadow-xl rounded-lg'>
                                <div>
                                    <div className='flex gap-4 items-center p-4'>
                                        <Avatar className='cursor-pointer border-2 border-blue-500'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-blue-600'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600 border-t border-gray-200'>
                                        {
                                            user && user.role === "student" && (
                                                <div className='flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
                                                    <User2 className='w-4 h-4 text-blue-500' />
                                                    <Button variant='link' className='p-0 text-blue-500 hover:text-blue-600'>
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
                                            <LogOut className='w-4 h-4 text-red-500' />
                                            <Button onClick={logoutHandler} variant='link' className='p-0 text-red-500 hover:text-red-600'>
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
