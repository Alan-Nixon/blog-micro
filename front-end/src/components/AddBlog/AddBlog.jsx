import React, { useState } from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar/SideBar'
import './AddBlog.css'
import { insertBlogData } from '../../BackendFunc'

function AddBlog() {
    const [imageUrl, setImageData] = useState(false)
    const [cate, setCate] = useState("Technology")
    const [blogData, setBlogData] = useState({ title: "", cate: "Technology", content: "", image: [] })
    const onChangeFunc = (e) => {
        setCate(e.target.value)
    }
    const submitBlog = () => {
        if (validation()) {
            alert(blogData.title)
            insertBlogData(blogData)
        } else {

        }
    }

    function validation() {
        return true
    }
    return (
        <>
            <Navbar />
            <SideBar />

            <div style={{ paddingTop: "50px", marginLeft: "250px" }}>
                <h1><b><strong>Add Your blogs</strong></b></h1>
                <div className="formDiv" style={{ marginTop: "80px" }}>
                    <input type="text" onChange={(e) => setBlogData(rest => ({ ...rest, title: e.target.value }))} className='inputOfAdd' placeholder='Enter the title' /> <br />
                    <div>
                        <input type="text" className="inputofAdd" value={cate} readOnly placeholder='Select a category' style={{ zIndex: "-1", position: "relative" }} />
                        <select id="Category" onChange={onChangeFunc} style={{ float: "right", marginRight: "100px", zIndex: "2", marginTop: "-32px", position: "relative" }}>
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Science">Science</option>
                        </select>
                    </div> <br />

                    <textarea type="text" className='textareaOfAdd' onChange={(e) => setBlogData(rest => ({ ...rest, content: e.target.value }))} rows="7" cols="120" /><br />
                    {imageUrl && <img src={imageUrl} style={{width:"100px",marginLeft:"50px"}} />}
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
