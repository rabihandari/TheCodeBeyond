import React, { useState, useEffect, useRef } from 'react';
import { Typography,  CardMedia, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactMarkdown from 'react-markdown'
import { useHistory } from 'react-router-dom';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { fetchPost, savePost as reqSavePost, deletePost as removePost } from '../../api';
import { useDispatch } from 'react-redux';


import * as actionTypes from '../../actions/actionTypes';
import useStyles from './styles';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Comments from './Comments/Comments'
import PopularPosts from '../../components/PopularPosts/PopularPosts';
import Report from '../../components/Report/Report';
import Confirm from '../../components/Confirm/Confirm';
import  * as reportActions from './actions/report';
import  * as blockActions from './actions/block';
import FooterV2 from '../../components/FooterV2/FooterV2';

const renderers = {
    code:({language,value})=>{
        return <SyntaxHighlighter style={dracula} language={language} children={value || "" } />
    },
    paragraph: props => <p style={{ fontSize: '20px', lineHeight: '32px' }}>{props.children}</p>
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Post = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [saved, setSaved] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const postRef = useRef(null);
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));
    const [reportOpen, setReportOpen] = useState(false);
    const [reportOpen2, setReportOpen2] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    // Fetch the post
    useEffect(() => {
        dispatch({ type: actionTypes.LOADING_START });
        let id = props.match.params.id;
        setLoading(true);
        fetchPost(id).then(({ data }) => {
            setPost(data.post);
            setUser(data.author);
            setSaved(data.saved);
            setBlocked(data.blocked);
            dispatch({ type: actionTypes.LOADING_END });
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            history.push("/404");
        });
    }, [props, history, dispatch]);

    // Commeting...
    const openComments = () => {
        setCommentsOpen(true);
    }

    const closeComments = () => {
        setCommentsOpen(false);
    }

    const savePost = () => {
        if (!currentUser) {
            history.push("/login");
            return
        }

        setSaved(prev => !prev);
        reqSavePost({ postId: post._id }).catch(error => {
            console.log(error)
        });
    }

    // Reporting...
    const openReport = () => {
        setReportOpen(true);
    }
    
    const openReport2 = () => {
        setReportOpen2(true);
    }

    // Blocking...
    const openConfirmation = () => {
        setConfirmationOpen(true);
    }

    
    // Deleting...
    const deletePost = () => {
        dispatch({ type: actionTypes.LOADING_START });
        removePost(post._id).then((res) => {
            history.push('/');
            dispatch({ type: actionTypes.DELETE, payload: res.data.post });
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    return(
        <div>
            <Grid container className={classes.mainContainer} justify="space-evenly">
                <Grid item sm={12} md={12}>
                    {(post && user) && 
                        <div className={classes.postContainer} ref={postRef} style={!matches ? { width: window.screen.width - 48 } : {}}>
                            <Header user={user} post={post} saved={saved} blocked={blocked} savePost={savePost} deletePost={deletePost} openReport={openReport} openReport2={openReport2} openConfirmation={openConfirmation}/>
                            {post.imageFile !== "" && 
                                <div className={classes.mdMediaHolder}><CardMedia image={post.imageFile} className={classes.mdMedia}/></div>
                            }
                            <ReactMarkdown renderers={renderers} children={post.body} className={classes.mdBody}/>
                            <Typography className={classes.divider}>● ● ●</Typography>
                            <Footer post={post} openComments={openComments} saved={saved} blocked={blocked} savePost={savePost} deletePost={deletePost} openReport={openReport} openReport2={openReport2} openConfirmation={openConfirmation}/>
                        </div>
                    }
                </Grid>
                
                {post && 
                    <Comments 
                        post={post} 
                        setPost={setPost}
                        commentsOpen={commentsOpen} 
                        closeComments={closeComments} 
                        anchor={matches ? 'right' : 'bottom'} 
                    />
                }

                <Grid item xs={10} md={8}>
                    
                    {!isLoading && 
                        <PopularPosts />
                    }
                </Grid>
                
                {reportOpen &&
                    <Report whatToReport='Post' closeReport={reportActions.closeReport(setReportOpen)} callback={reportActions.reportPost(post._id, setAlert, dispatch)}/>
                }
                {reportOpen2 &&
                    <Report whatToReport='Author' closeReport={reportActions.closeReport(setReportOpen2)} callback={reportActions.reportAuthor(post.creator, setAlert, dispatch)}/>
                }
                {confirmationOpen &&
                    <Confirm 
                        action='Block' 
                        title='Are you sure you want to block this author'
                        description="By blocking this author you will not be able view or search any post he/she creates. You can always unblock this user in your settings page" 
                        close={blockActions.closeConfirmation(setConfirmationOpen)} 
                        callback={blockActions.blockAuthor(post.creator, setAlert, dispatch, setBlocked)}
                    />
                }
                {alert.open && 
                    <Snackbar open={alert.open} autoHideDuration={3000} onClose={reportActions.handleClose(setAlert)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={reportActions.handleClose(setAlert)} severity={alert.severity}>
                            {alert.message}
                        </Alert>
                </Snackbar>
                }
            </Grid>
            <FooterV2 />
        </div>
    );
}

export default Post;

