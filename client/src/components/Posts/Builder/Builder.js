import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';
import Filebase from 'react-file-base64';

import useStyles from './styles';
import { createPost } from '../../../actions/posts';
import Tags from './Tags/Tags';

const Builder = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: '', description: '', body: '', imageFile: '', tags: ['Angular', 'jQuery', 'Polymer', 'React.js', 'Vue.js'] });
    const [titleError, setTitleError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (postData.title === ""){
            setTitleError(true);
            return;
        }
        
        dispatch(createPost(postData));

    }

    const handleChange = (event) => {
        setPostData({ ...postData, [event.target.name]: event.target.value })
        
        if (event.target.name === "title"){
            if(!event.target.value){
                setTitleError(true);
            }else {
                setTitleError(false);
            }
        }
    }

    return(
        <div className={classes.container}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h4" className={classes.title}>New post</Typography>
                <TextField error={titleError} helperText={titleError && "Please enter a title"} className={classes.textInput} fullWidth name="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title}/>
                <TextField className={classes.textInput} fullWidth name="description" label="Description" variant="outlined" onChange={handleChange} value={postData.description}/>
                <TextField className={classes.textInput} fullWidth name="body" label="Body" variant="outlined" multiline rows={5} onChange={handleChange} value={postData.body}/>
                <Tags postData={postData} setPostData={setPostData}/>
                <div className={classes.fileInput}><Filebase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, imageFile: base64})} /></div>
                <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary">Add Post</Button>
            </form>
        </div>
    );
}

export default Builder;