



import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const categories = [
    { name: "Frontend Developer", emoji: "💻" },
    { name: "Backend Developer", emoji: "⚙️" },
    { name: "Data Science", emoji: "📊" },
    { name: "Graphic Designer", emoji: "🎨" },
    { name: "FullStack Developer", emoji: "👨‍💻" },
    { name: "UX/UI Designer", emoji: "🖌️" },
    { name: "DevOps Engineer", emoji: "🛠️" },
    { name: "Product Manager", emoji: "📋" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-12 bg-gray-50 rounded-lg">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse by Category</h2>
                <p className="text-gray-600">Find your perfect job in these popular categories</p>
            </div>
            
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent className="-ml-4">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button 
                                    onClick={() => searchJobHandler(category.name)} 
                                    className="w-full h-24 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2"
                                >
                                    <span className="text-2xl">{category.emoji}</span>
                                    <span className="text-gray-700 font-medium">{category.name}</span>
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex left-2 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
                <CarouselNext className="hidden md:flex right-2 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
            </Carousel>
            
            <div className="text-center mt-8">
                <Button 
                    variant="outline" 
                    className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => {
                        dispatch(setSearchedQuery(""));
                        navigate("/browse");
                    }}
                >
                    View All Categories
                </Button>
            </div>
        </div>
    )
}

export default CategoryCarousel;