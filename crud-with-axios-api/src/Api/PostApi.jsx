import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})

// Get method
export const getPost = () => {
    return api.get("/posts");
}

//Delete Method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}

//Post method
export const postData = (post) => {
    return api.post("/posts",post);
}

//Put Method
export const updatePost = (id, post) => {
    return api.put(`/posts/${id}`,post);
}