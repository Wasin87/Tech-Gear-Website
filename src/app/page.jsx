import Banner from '@/components/HomePage/Banner';
import Categories from '@/components/HomePage/Categories';
import Features from '@/components/HomePage/Features';
import NewTrends from '@/components/HomePage/NewTrends';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import React from 'react';

const page = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <Banner></Banner>
            <NewTrends></NewTrends>
            <Categories></Categories>
            <Features></Features>
            
            <footer>
                 
            </footer>
        </div>
    );
};

export default page;