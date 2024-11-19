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
    <section className="flex flex-wrap justify-center my-2">
    <section className="my-5">
        <Form 
        data={data}
        setData={setData}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi} />
    </section>
    <section>
        <ol className="list-decimal list-inside marker:text-sky-400 marker:text-xl grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 grid-rows-5 gap-4 p-3 md:mx-20">
            {
                data.map((currElem) => {
                    const {id, title, body} = currElem;
                    return (
                        <li className="bg-[#212f3c] rounded-sm p-4 border-l-2 border-white" key={id}>
                            <p className="text-gray-300 text-xl">Title: {title}</p>
                            <p className="text-white mt-3 mb-3">Body: {body}</p>
                            <button className='me-2 p-1 bg-green-500 hover:bg-green-400 text-white rounded-sm px-3' onClick={()=> handleUpdatePost(currElem)}>Edit</button>
                            <button className='mx-2 p-1 bg-red-500 hover:bg-red-400 text-white rounded-sm px-3' onClick={()=> handleDeletePost(id)}>Delete</button>
                        </li>
                    );
                })
            }
        </ol>
    </section>
    </section>
  )
}

export default Posts