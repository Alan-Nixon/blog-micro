import React, { useState } from 'react';
import './SideBar.css';

function SideBar({ setHeading, setBlogs, allBlogs }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const handleClick = (category) => {
        setHeading(`All Blogs${category !== 'All' ? ` Of ${category}` : ''}`);
        setActiveCategory(category);
        if (category !== "All") {
            const data = allBlogs.filter(item => item.category.toLowerCase() === category.toLowerCase()); // Compare with normalized category name
            console.log(data);
            setBlogs(data);
        } else {
            setBlogs(allBlogs)
        }
    };

    return (
        <div className="sidebar">
            <p className={activeCategory === 'All' ? 'links active' : 'links'} onClick={() => handleClick('All')}>All Blogs</p>
            <p className={activeCategory === 'technology' ? 'links active' : 'links'} onClick={() => handleClick('technology')}>Technology</p>
            <p className={activeCategory === 'business' ? 'links active' : 'links'} onClick={() => handleClick('business')}>Business</p>
            <p className={activeCategory === 'science' ? 'links active' : 'links'} onClick={() => handleClick('science')}>Science</p>

            <p className={activeCategory === 'science' ? 'links active' : 'links'} onClick={() => window.location.href = '/addBlogs'} style={{ marginTop: "100%" }}> Add your own blog </p>
            <p className={activeCategory === 'science' ? 'links active' : 'links'} onClick={() => window.location.href = '/logout'}> Logout </p>

        </div>
    );
}

export default SideBar;
