import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Typography, TextField, Button, Grid, CardMedia, Tooltip, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import Help from '@material-ui/icons/Help';
import Edit from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';

import useStyles from './styles';
import { createPost, editPost } from '../../../actions/posts';
import { fetchPost } from '../../../api';
import Tags from './Tags/Tags';
import * as actionTypes from '../../../actions/actionTypes';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Builder = ({ editing }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const mdSection = useRef();
    const [postData, setPostData] = useState({ title: '', description: '', body: '', imageFile: '', tags: ['Angular', 'jQuery', 'Polymer']});
    const [postImage, setPostImage] = useState(null);
    const [preview, setPreview] = useState(true);
    const [fullPreview, setFullPreview] = useState(false);
    const [alert, setAlert] = React.useState({ open: false, message: '', severity: 'success' });
    const [titleError, setTitleError] = useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));

    const renderers = {
        code:({language,value})=>{
            return <SyntaxHighlighter style={dracula} language={language} children={value || "" } />
        },
        paragraph: props => <p style={{ fontSize: '20px', lineHeight: '32px' }}>{props.children}</p>,
        listItem: props => <li style={{ fontSize: '20px', lineHeight: '32px', marginTop: '16px' }}>{props.children}</li>
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if (postData.title === ""){
            setTitleError(true);
            return;
        }
        const formData = new FormData();
        formData.append('id', postData._id);
        formData.append('title', postData.title);
        formData.append('description', postData.description);
        formData.append('body', postData.body);
        formData.append('tags', JSON.stringify(postData.tags));
        formData.append('imageFile', postData.imageFile);
        formData.append('creator', postData.creator);
        formData.append('name', user.result.name);
        
        // Create or Edit post...
        if(editing){
            dispatch(editPost(formData)).then(() => {
                setAlert({ open: true, message: 'Your post has been successfully updated!', severity: 'success' })
                setPostData({ title: '', description: '', body: '', imageFile: '', tags: ['Angular', 'jQuery', 'Polymer']});
            }).catch(error => {
                if(error?.response?.status === 406){
                    setAlert({ open: true, message: 'Your account is not activated yet', severity: 'error' })
                }else{
                    setAlert({ open: true, message: error?.response?.data?.message, severity: 'error' })
                }
                dispatch({ type: actionTypes.LOADING_END });
            });
        }else{
            dispatch(createPost(formData)).then(() => {
                setAlert({ open: true, message: 'Your post has been successfully uploaded!', severity: 'success' })
                setPostData({ title: '', description: '', body: '', imageFile: '', tags: ['Angular', 'jQuery', 'Polymer']});
            }).catch(error => {
                if(error?.response?.status === 406){
                    setAlert({ open: true, message: 'Your account is not activated yet', severity: 'error' })
                }else{
                    setAlert({ open: true, message: error?.response?.data?.message, severity: 'error' })
                }
                dispatch({ type: actionTypes.LOADING_END });
            });
        }

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

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({ open: false, message: '', severity: 'success' })
      };


      useEffect(() => {
          if(editing){
            dispatch({ type: actionTypes.LOADING_START });
            fetchPost(params.id).then((res) => {
                setPostData(res.data.post);
                dispatch({ type: actionTypes.LOADING_END });
            }).catch(error => {
                setAlert({ open: true, message: error.response.data.message, severity: 'error' });
                dispatch({ type: actionTypes.LOADING_END });
            });
          }
      }, [editing, dispatch, params]);

    return(
        <div className={classes.container}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container direction="row" justify='center' spacing={5}>
                    {!fullPreview &&
                    <Grid item xs={12} md={preview ? 6 : 12}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                            <Typography variant="h4" className={classes.title}>{editing ? "Edit" : "New"} post</Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Toggle Preview"><IconButton color="secondary" onClick={() => {setPreview(!preview)}}><Visibility /></IconButton></Tooltip>
                                <Tooltip title="Markdown Help"><IconButton color="secondary" onClick={() => {window.open("https://www.markdownguide.org/basic-syntax/", "_blank")}}><Help /></IconButton></Tooltip>
                            </Grid>
                        </Grid>
                        <TextField error={titleError} helperText={titleError && "Please enter a title"} className={classes.textInput} fullWidth name="title" label="Title" variant="outlined" onChange={handleChange} value={postData.title}/>
                        <TextField className={classes.textInput} fullWidth name="description" label="Description" variant="outlined" onChange={handleChange} value={postData.description}/>
                        <TextField className={classes.textInput} fullWidth name="body" label="Body" variant="outlined" multiline rows={10} onChange={handleChange} value={postData.body}/>
                    </Grid>
                    }
                    {(preview || fullPreview) &&
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
                    <Grid item md={12}>
                        <Tags postData={postData} setPostData={setPostData}/>
                        <div className={classes.fileInput}>
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <Button className={classes.buttonSubmit} variant="outlined" color="secondary" startIcon={fullPreview ? <Edit/> : <Visibility />} onClick={toggleFullPreview}>{fullPreview ? "Edit" : "Full Preview"}</Button>
                        <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary">{editing ? "Update" : "Add"} Post</Button>
                    </Grid>
                    <Grid item>
                        <Snackbar open={alert.open} autoHideDuration={6000} onClose={closeAlert}>
                            <Alert onClose={closeAlert} severity={alert.severity}>
                                {alert.message}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </form>
        </div>
          
        
    );
}

export default Builder;

