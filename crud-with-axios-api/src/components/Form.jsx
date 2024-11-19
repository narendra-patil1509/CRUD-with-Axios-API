import React, { useEffect, useState } from 'react'
import { postData, updatePost } from '../Api/PostApi'

const Form = ({data, setData, updateDataApi, setUpdateDataApi}) => {
  const [addData, setAddData] = useState({
    title:"",
    body:"",
  })

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // Get the updated data and add into input form fields
  useEffect(() => {
    updateDataApi && setAddData({
      title:updateDataApi.title || "",
      body:updateDataApi.body || "",
    })
  },[updateDataApi])

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]:value,
      }
    })
  } 

  //Add data to API
  const addPostData = async () => {
    const res = await postData(addData);
    if(res.status === 201) {
      setData([...data, res.data]);
      setAddData({title:"",body:""})//After putting data into api Form fields empty
    }
  }

  //UpdatePostData
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log("DDDD= ",res);

      if(res.status === 200) {
        setData((prev) => {
          return prev.map((currElem) => {
            return currElem.id === res.data.id ? res.data: currElem;
          })
        })
      }
      setAddData({title:"",body:""})//After putting data into api Form fields empty
      setUpdateDataApi({});
    } catch (error) {
      console.log(error);
    }
    
  }

  //Handle Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === "Add") {
      addPostData();
    } else if(action === "Edit") {
      updatePostData();
    }
    addPostData();
  }

  return (
    <form onSubmit={handleSubmitForm} className='flex flex-wrap  justify-center p-4 rounded-sm bg-[#212f3d]'>
        <div className='mx-2 mb-3 sm:mb-0'>
            <label htmlFor="title"></label>
            <input type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            value={addData.title}
            onChange={handleInputChange}
            className='rounded-sm outline-none p-2 px-5' />
        </div>
        <div className='mx-2 mb-3 sm:mb-0'>
        <label htmlFor="body"></label>
            <input type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="Add Body"
            value={addData.body}
            onChange={handleInputChange}
            className='rounded-sm outline-none p-2 px-5' />
        </div>
        <button className='mx-4 p-1 bg-green-500 hover:bg-green-400 text-white rounded-sm px-5' type="submit" value={ isEmpty ? "Add" : "Edit"}>{ isEmpty ? "Add" : "Edit"}</button>
    </form>
  )
}

export default Form