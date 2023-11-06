import React, { useState, useEffect} from 'react';
import  FileBase from 'react-file-base64';
import {TextField, Button, Typography, Paper} from '@mui/material';
import './styles.css';
import {useDispatch, useSelector} from "react-redux";
import { createPost,updatePost } from '../../actions/posts';


//get the current ID

const Form = ({currentId, setCurrentId}) =>{
   
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''});
   
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
    const dispatch = useDispatch();

    useEffect(() =>{
        if(post) setPostData(post);
    }, [post])
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
          }
        dispatch(createPost(postData));
 
        clear();
    }
    const clear = () =>{
        setCurrentId(null);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }
    
    return (
        <Paper className='paper' >
            <form autoComplete='off' noValidate className='form' onSubmit={handleSubmit}>
                 <Typography className='text' 
                 variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography> 
                 <div className='textfields'>
                 <TextField  name="creator" variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} />
                 </div>
                 <div className='textfields'>
                 <TextField 
                 name="title" 
                 variant='outlined' 
                 label="Title" 
                 fullWidth 
                 value={postData.title} 
                 onChange={(e) => setPostData({...postData, title: e.target.value})} />
                 </div>
                 <div className='textfields'>
                 <TextField name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
                 </div>
                 <div className='textfields'>
                 <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                 </div>
                 <div className='fileInput'>
                    <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData, selectedFile: base64})}
                />
                 </div>
                 <div className='textfields'>
                 <Button className='buttonSubmit' variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                 </div>
                 <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >clear</Button>
            </form>
        </Paper>
    )
}

export default Form;