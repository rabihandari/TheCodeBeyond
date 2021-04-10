import React, { useState, useEffect, useRef } from 'react';
import { Typography,  CardMedia, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactMarkdown from 'react-markdown'
import { useHistory } from 'react-router-dom';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { fetchPost } from '../../api';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../actions/actionTypes';

import useStyles from './styles';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Comments from './Comments/Comments'
import PopularPosts from '../../components/PopularPosts/PopularPosts';

const renderers = {
    code:({language,value})=>{
        return <SyntaxHighlighter style={dracula} language={language} children={value || "" } />
    },
    paragraph: props => <p style={{ fontSize: '20px', lineHeight: '32px' }}>{props.children}</p>
}

const Post = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const postRef = useRef(null);
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));


    // Fetch the post
    useEffect(() => {
        dispatch({ type: actionTypes.LOADING_START });
        let id = props.match.params.id;
        fetchPost(id).then(({data}) => {
            setPost(data.post);
            setUser(data.user);
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(err => {
            history.push("/404");
        });
    }, [props, history, dispatch]);


    const openComments = () => {
        setCommentsOpen(true);
    }

    const closeComments = () => {
        setCommentsOpen(false);
    }


    return(
        <Grid container className={classes.mainContainer} justify="space-evenly">
            <Grid item sm={12} md={12}>
                {(post && user) && 
                    <div className={classes.postContainer} ref={postRef} style={!matches ? { width: window.screen.width - 48 } : {}}>
                        <Header user={user} post={post}/>
                        {post.imageFile !== "" && 
                            <div className={classes.mdMediaHolder}><CardMedia image={post.imageFile} className={classes.mdMedia}/></div>
                        }
                        <ReactMarkdown renderers={renderers} children={post.body} className={classes.mdBody}/>
                        <Typography className={classes.divider}>● ● ●</Typography>
                        <Footer post={post} openComments={openComments}/>
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
                <PopularPosts />
            </Grid>
        </Grid>
    );
}

export default Post;

