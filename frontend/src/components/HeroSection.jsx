import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative">
            {/* Background image with overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 text-center py-28 px-4">
                <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                    <span className='mx-auto px-5 py-2 rounded-full bg-white/90 text-blue-600 font-medium shadow-md backdrop-blur-sm'>
                        Most Trusted Job Board
                    </span>
                    <h1 className='text-5xl font-bold text-gray-800'>
                        Your Career Starts Here: <br />
                        Find & Apply for
                        <span className='text-blue-600 ml-2'>
                            <Typewriter
                                words={[" Top Jobs 🚀", " IT Jobs 💻", " Design Jobs 🎨", " Marketing Jobs 📢", " Remote Jobs 🌍"]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={80}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </span>
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Explore, search, and apply for the best job opportunities on our reliable and easy-to-use portal.
                    </p>
                    <div className='flex w-full md:w-[70%] lg:w-[60%] shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200 pl-6 pr-2 rounded-full items-center gap-2 mx-auto h-14'>
                        <input
                            type="text"
                            placeholder='Find your dream job...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full bg-transparent text-gray-700 placeholder-gray-400'
                            onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-full bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0 transition-all duration-300"
                        >
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                    <div className='flex gap-4 justify-center mt-4'>
                        <span className='text-sm text-gray-500'>Popular Searches:</span>
                        <div className='flex gap-2 flex-wrap justify-center'>
                            {['Developer', 'Designer', 'Marketing', 'Remote', 'Manager'].map((tag) => (
                                <button 
                                    key={tag}
                                    onClick={() => {
                                        setQuery(tag);
                                        dispatch(setSearchedQuery(tag));
                                        navigate("/browse");
                                    }}
                                    className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection