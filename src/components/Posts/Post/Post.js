import React from 'react';
import {Card, CardActions, CardContent, Button, Typography} from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import './styles.css';
import { deletePost, likePost } from '../../../actions/posts';
const Post = ({post, setCurrentId}) =>{
    const dispatch = useDispatch();
    return (
        <Card className='card'>
             <img src={post.selectedFile} className='media' alt={post.title} style={{height: '200px'}}/>  
             {/* <img className='media' src={post.selectedFile} alt={post.title} />  */}
           <div className='overlay'>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className='overlay2'>
                <Button 
                style={{color: 'white'}} 
                size="small" 
                onClick={()=>{setCurrentId(post._id)}}>
                <MoreHorizIcon fontSize='default' /> 
                </Button>
            </div>
            <div className='details'>
                <Typography variant='body2' color="textSecondary">{post.tags.map((tag)=> `#${tag}`)}</Typography>
            </div>
            <Typography className="title"  variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                 <Typography variant="body2" component='p' color="textSecondary" >{post.message}</Typography>
            </CardContent>
            <CardActions className='cardActions'>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize='small'/>
                    &nbsp; Like &nbsp; {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small'/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;