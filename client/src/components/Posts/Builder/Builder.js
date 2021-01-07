import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Typography, TextField, Button, Grid, CardMedia } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import Filebase from 'react-file-base64';
import moment from 'moment';

import useStyles from './styles';
import { createPost } from '../../../actions/posts';
import Tags from './Tags/Tags';



const Builder = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mdSection = useRef();
    const [postData, setPostData] = useState({ title: '', description: '', body: '', imageFile: '', tags: ['Angular', 'jQuery', 'Polymer'], createdAt: Date.now()});
    const [preview, setPreview] = useState(false);
    const [titleError, setTitleError] = useState(false);

    const renderers = {
        code:({language,value})=>{
            return <SyntaxHighlighter style={dracula} language={language} children={value || "" } />
        }
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();

        if (postData.title === ""){
            setTitleError(true);
            return;
        }
        
        dispatch(createPost(postData));

    }

    const handleChange = (event) => {
        // Updating post state
        setPostData({ ...postData, [event.target.name]: event.target.value })
        
        // Validation
        if (event.target.name === "title"){
            if(!event.target.value){
                setTitleError(true);
            }else {
                setTitleError(false);
            }
        }
        
        // Scroll to bottom
        if (mdSection.current) {
            mdSection.current.scrollTop = mdSection.current.scrollHeight;
        }
    }


    return(
        <div className={classes.container}>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={5}>
                <Grid item xs={12} md={preview ? 6 : 12}>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="h4" className={classes.title}>New post</Typography>
                        <Button color="primary"startIcon={<Visibility />} onClick={() => {setPreview(!preview)}}>Toggle Preview</Button>
                    </Grid>
                    <TextField error={titleError} helperText={titleError && "Please enter a title"} className={classes.textInput} fullWidth name="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title}/>
                    <TextField className={classes.textInput} fullWidth name="description" label="Description" variant="outlined" onChange={handleChange} value={postData.description}/>
                    <TextField className={classes.textInput} fullWidth name="body" label="Body" variant="outlined" multiline rows={10} onChange={handleChange} value={postData.body}/>
                </Grid>
                {preview &&
                <Grid item xs={12} md={6} style={{ maxHeight: '500px', overflow: 'auto'}} ref={mdSection}>
                    <Typography variant="h3" className={classes.mdTitle}>{postData.title.length === 0 ? "Your Title" : postData.title}</Typography>
                    <Typography variant="body2" className={classes.mdHeaderContent}>{moment(postData.createdAt).format('LL')} &nbsp; &nbsp; &nbsp; &nbsp; In {postData.tags.join(', ')}</Typography>
                    {postData.imageFile !== "" && <CardMedia image={postData.imageFile} className={classes.mdMedia}></CardMedia>}
                    <Typography variant="body1" className={classes.mdDescription}>{postData.description}</Typography>
                    <ReactMarkdown renderers={renderers} children={postData.body} />
                </Grid>
                }
                <Grid item md={12}>
                    <Tags postData={postData} setPostData={setPostData}/>
                    <div className={classes.fileInput}><Filebase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, imageFile: base64})} /></div>
                    <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary">Add Post</Button>
                </Grid>
            </Grid>
            </form>
        </div>
          
        
    );
}

export default Builder;

