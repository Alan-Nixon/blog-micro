import React, { useEffect, useState } from 'react'
import { fetchBlogData } from '../../BackendFunc'


function Blogs({ Heading, blog, setBlogs, setAllBlogs }) {
    useEffect(() => {
        fetchBlogData().then((result) => {
            console.log(result);
            setBlogs(result)
            setAllBlogs(result)
        })
    }, [])
    return (
        <div style={{ marginTop: "0px", paddingTop: "51px", paddingLeft: "230px" }}>
            <h1><b>{Heading}</b></h1>
            {blog && <>
                {blog.map((item) =>
                    <div className="row">
                        {item?.image_url && <>
                            <div className="col-sm-4">
                                <img src={item.image_url} style={{ width: "300px", marginTop: "20px", zIndex: "-999px", }} alt="" />
                            </div>
                            <div className="col-sm-7 mr-2">
                                <h3>{item?.title}</h3>
                                <div style={{ width: '100%', wordWrap: 'break-word' }}>
                                    <p> {item.content}</p>
                                </div>
                            </div>
                        </>}
                    </div>
                )}
            </>}
        </div>
    )
}

export default Blogs
