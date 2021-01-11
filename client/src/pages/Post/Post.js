import React, { useState, useEffect } from 'react';
import { Container, Typography, CardMedia } from '@material-ui/core';
import ReactMarkdown from 'react-markdown'
import { useHistory } from 'react-router-dom';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { fetchPost } from '../../api';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../actions/actionTypes';
import moment from 'moment';

import useStyles from './styles';
import PopularPosts from '../../components/PopularPosts/PopularPosts';

const renderers = {
    code:({language,value})=>{
        return <SyntaxHighlighter style={dracula} language={language} children={value || "" } />
    }
}

const Post = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [post, setPost] = useState(null);

    // Fetch the post
    useEffect(() => {
        dispatch({ type: actionTypes.LOADING_START });
        let id = props.match.params.id;
        fetchPost(id).then(({data}) => {
            setPost(data.post);
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(err => {
            history.push("/404");
        });
    }, [props, history, dispatch]);

    return(
        <Container>
            {post && 
                <div className={classes.postContainer}>
                    <Typography variant="h2" className={classes.mdTitle}>{post.title}</Typography>
                    <Typography variant="body2" className={classes.mdHeaderContent}>{moment(Date.now()).format('LL')} &nbsp; &nbsp; &nbsp; &nbsp; In {post.tags && post.tags.join(', ')}</Typography>
                    {post.imageFile !== "" && 
                        <div className={classes.mdMediaHolder}><CardMedia image={post.imageFile} className={classes.mdMedia}/></div>
                    }
                    <Typography variant="body1" className={classes.mdDescription}>{post.description}</Typography>
                    <ReactMarkdown renderers={renderers} children={post.body} className={classes.mdBody} />
                </div>
            }
            <PopularPosts />
        </Container>
    );
}

export default Post;