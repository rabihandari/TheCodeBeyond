import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Typography, TextField, Button, Grid, CardMedia, Tooltip, IconButton, Chip } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import Help from '@material-ui/icons/Help';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';

import useStyles from './styles';


const Builder = ({ postPreviewed, postData, setPostData, publish }) => {
    const classes = useStyles();
    const mdSection = useRef();
    const [postImage, setPostImage] = useState(null);
    const [fullPreview, setFullPreview] = useState(false);
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
        
        publish();

    }

    const onFileChange = (e) => {
        var file = e.target.files[0];
        setPostData({ ...postData, imageFile: file });
        setPostImage(URL.createObjectURL(file));
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
        }else{
            // Scroll to bottom
            if (mdSection.current) {
                mdSection.current.scrollTop = mdSection.current.scrollHeight;
            }
        }
    }

    const toggleFullPreview = () => {
        setFullPreview(!fullPreview);
    }


    return(
        <div className={classes.container}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container direction="row" justify='center' spacing={5}>
                    {!fullPreview &&
                    <Grid item xs={12} md={postPreviewed ? 6 : 12}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                            <Typography variant="h4" className={classes.title}>Your Answer</Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Markdown Help"><IconButton color="secondary" onClick={() => {window.open("https://www.markdownguide.org/basic-syntax/", "_blank")}}><Help /></IconButton></Tooltip>
                            </Grid>
                        </Grid>
                        <TextField error={titleError} helperText={titleError && "Please enter a title"} className={classes.textInput} fullWidth name="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title}/>
                        <TextField className={classes.textInput} fullWidth name="description" label="Description" variant="outlined" onChange={handleChange} value={postData.description}/>
                        <TextField className={classes.textInput} fullWidth name="body" label="Body" variant="outlined" multiline rows={10} onChange={handleChange} value={postData.body}/>
                    </Grid>
                    }
                    {(postPreviewed || fullPreview) &&
                    <Grid item xs={12} md={fullPreview ? 12 : 6} style={ !fullPreview ? { maxHeight: '500px', overflow: 'auto'} : {minHeight: '500px', maxWidth: '700px'}} ref={mdSection}>
                        <Typography variant="h3" className={classes.mdTitle}>{postData.title.length === 0 ? "Your Title" : postData.title}</Typography>
                        <Typography variant="body2" className={classes.mdHeaderContent}>{moment(Date.now()).format('LL')} &nbsp; &nbsp; &nbsp; &nbsp; In {postData.tags.join(', ')}</Typography>
                        {postData.imageFile !== "" && 
                            <div className={fullPreview ? classes.mdMediaHolderLarge : classes.mdMediaHolderSmall}>
                                <CardMedia image={postImage || postData.imageFile} className={classes.mdMedia}/>
                            </div>
                        }
                        <Typography variant="body1" className={classes.mdDescription}>{postData.description}</Typography>
                        <ReactMarkdown renderers={renderers} children={postData.body} className={classes.mdBody} />
                    </Grid>
                    }
                    <Grid item xs={12} md={12} style={{ padding: '10px 20px' }}>
                        <Grid container direction="row" className={classes.tagsContainer} spacing={2}>
                            {postData.tags.map((tag) => 
                                <Grid item key={tag}>
                                    <Chip 
                                        className={classes.tag} 
                                        label={tag} 
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className={classes.fileInput}>
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <Button className={classes.buttonSubmit} variant="outlined" color="secondary" startIcon={fullPreview ? <Edit/> : <Visibility />} onClick={toggleFullPreview}>{fullPreview ? "Edit" : "Full Preview"}</Button>
                        <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary">Publish</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
          
        
    );
}

export default Builder;

