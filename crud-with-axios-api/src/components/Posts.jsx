import axios from "axios";
import { useEffect, useState } from "react";
import {deletePost, getPost} from "../Api/PostApi"
import Form from "./Form";

const Posts = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});
    const getPostData = async () => {
        const res = await getPost();
        setData(res.data);
    };

    //handleDeletePost
    const handleDeletePost = async (id) => {
        const res = await deletePost(id);
        try {
            if(res.status == 200) {
                const newUpdatedPosts = data.filter((currPost) =>{
                    return currPost.id != id;
                })
                setData(newUpdatedPosts);
            } else {
                console.log("Failed to delete post",res.status);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    //HandleUpdatePost
    const handleUpdatePost = (currElem) => setUpdateDataApi(currElem);
    
      useEffect(() => {
        getPostData();
      },[]);

  return (
    <>
    <section>
        <Form 
        data={data}
        setData={setData}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi} />
    </section>
    <section>
        <ol>
            {
                data.map((currElem) => {
                    const {id, title, body} = currElem;
                    return (
                        <li key={id}>
                            <p>Title: {title}</p>
                            <p>Body: {body}</p>
                            <button onClick={()=> handleUpdatePost(currElem)}>Edit</button>
                            <button onClick={()=> handleDeletePost(id)}>Delete</button>
                        </li>
                    );
                })
            }
        </ol>
    </section>
    </>
  )
}

export default Posts