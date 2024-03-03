import React, { useState } from 'react'
import Navbar from '../Navbar'
import Blogs from '../Blogs/Blogs'
import SideBar from '../SideBar/SideBar'
import './Home.css'

export default function Home() {
  const [Heading, setHeading] = useState("Latest News and Blogs")
  const [blog, setBlogs] = useState([])
  const [allBlogs, setAllBlogs] = useState([])
  return (
    <>
      <Navbar />
      <SideBar Heading={Heading} setHeading={setHeading} blog={blog} setBlogs={setBlogs} allBlogs={allBlogs} />
      <Blogs Heading={Heading} setHeading={setHeading} blog={blog} setBlogs={setBlogs} setAllBlogs={setAllBlogs} />
    </>
  )
}

