import React, { useState } from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar/SideBar'
import './AddBlog.css'
import { insertBlogData } from '../../BackendFunc'

function AddBlog() {
    const [imageUrl, setImageData] = useState(false)
    const [cate, setCate] = useState("Technology")
    const [blogData, setBlogData] = useState({ title: "", cate: "Technology", content: "", image: [] })
    const [errBlogData, setErrBlogData] = useState({ titleErr: "", contentErr: "", imageErr: [] })
    const onChangeFunc = (e) => {
        setCate(e.target.value)
    }
    const submitBlog = () => {
        if (validation(blogData)) {
            alert("success")
            insertBlogData(blogData)
        } else {
            alert("failure")
        }
    }

    function validation({ title, content, image }) {
        const titleRegex = /^(?=.*[A-Za-z0-9\s\-.,?!()'"&:;])(?=(?:\w+\s+\w+).*$).*$/
        const contentRegex = /^(?:\S+\s+){14,}\S+.*$/

        if (titleRegex.test(title)) {
            if (contentRegex.test(content)) {
                if (image.length !== 0) {
                    return true
                } else {
                    setErrBlogData(rest => ({ ...rest, imageErr: "please select a image" }))
                    return false
                }
            } else {
                setErrBlogData(rest => ({ ...rest, contentErr: "please enter a content" }))
                return false
            }
        } else {
            setErrBlogData(rest => ({ ...rest, titleErr: "please enter a valid title" }))
            return false
        }
    }

    return (
        <>
            <Navbar />
            <SideBar />

            <div style={{ paddingTop: "50px", marginLeft: "250px" }}>
                <h1><b><strong>Add Your blogs</strong></b></h1>
                <div className="formDiv" style={{ marginTop: "80px" }}>
                    {errBlogData.titleErr && <p style={{ color: "red",marginLeft:"30px" }}>{errBlogData.titleErr}</p>}
                    <input type="text" onChange={(e) => setBlogData(rest => ({ ...rest, title: e.target.value }))} className='inputOfAdd' placeholder='Enter the title' /> <br />
                    <div>
                        <input type="text" className="inputofAdd" value={cate} readOnly placeholder='Select a category' style={{ zIndex: "-1", position: "relative" }} />
                        <select id="Category" onChange={onChangeFunc} style={{ float: "right", marginRight: "100px", zIndex: "2", marginTop: "-32px", position: "relative" }}>
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Science">Science</option>
                        </select>
                    </div> <br />
                    {errBlogData.contentErr && <p style={{ color: "red", marginLeft: "30px" }}>{errBlogData.contentErr}</p>}
                    <textarea type="text" className='textareaOfAdd' onChange={(e) => setBlogData(rest => ({ ...rest, content: e.target.value }))} rows="7" cols="120" /><br />
                    {imageUrl && <img src={imageUrl} style={{ width: "100px", marginLeft: "50px" }} />}
                    {errBlogData.imageErr && <p style={{ color: "red",marginLeft:"30px" }}>{errBlogData.imageErr}</p>}
                    <input type="file" className="inputofAdd" accept='image/*' onChange={(e) => {
                        setBlogData(rest => ({ ...rest, image: e.target.files[0] }))
                        setImageData(URL.createObjectURL(e.target.files[0]));
                    }} style={{ margin: "30px" }} />
                    <button onClick={submitBlog} style={{ marginBottom: "50px" }}>submit</button>
                </div>
            </div>
        </>
    )
}

export default AddBlog
