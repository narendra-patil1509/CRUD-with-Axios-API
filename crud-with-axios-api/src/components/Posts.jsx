import axios from "axios";
import { useEffect } from "react";
import {getPost} from "../Api/PostApi"

const Posts = () => {
    const getPostData = async () => {
        const res = await getPost();
        console.log(res);
      };
    
      useEffect(() => {
        getPostData();
      },[]);

  return (
    <h1>Posts</h1>
  )
}

export default Posts