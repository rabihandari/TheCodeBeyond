import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'; 
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import useStyles from './styles';
import Tags from '../../components/Posts/Builder/Tags/Tags';
import * as actionTypes from '../../actions/actionTypes';
import { addRequest } from '../../api';

const RequestPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [generalInfo, setGeneralInfo] = useState({ title: '', description: '', tags: ['Angular', 'jQuery', 'Polymer']});
    const [questionObjs, setQuestionObjs] = useState(['']);
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const questions = questionObjs.map((_, index) => <Question key={index} number={index + 1} questionObjs={questionObjs} setQuestionObjs={setQuestionObjs}/>)

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const addQuestion = () => {
        setQuestionObjs([ ...questionObjs, '' ]);
    }

    const removeQuestion = () => {
        if(questionObjs.length === 1) return;

        let newQuesions = [...questionObjs];
        newQuesions.pop();
        setQuestionObjs(newQuesions);
    }

    const handleChange = (e) => {
        setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        dispatch({ type: actionTypes.LOADING_START });
        addRequest({ ...generalInfo, questions: questionObjs }).then(() => {
            history.push('/');
            dispatch({ type: actionTypes.SHOW_ALERT, payload: { open: true, message: 'Successfully requested a post!', severity: 'success' } });
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error.message);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    return(
        <>
        <Container className={classes.container} >
            <Grid container spacing={2} alignItems="center">
                <Grid item md={8}>
                    <Typography variant='h5' className={classes.title}>Request Post</Typography>
                    <Typography variant='body2' className={classes.description}>Fill in the form below to ask the community on The Code Beyond for a post. Once your question is answered you will be emailed on {<span className={classes.emailDesc}>{currentUser?.result?.email}</span>} with a link to the post</Typography>
                </Grid>
                {matches &&
                    <Grid item md={4}>
                        <Grid container direction="row-reverse" className={classes.submitContianer}>
                            <Button 
                                color="primary" 
                                variant="text" 
                                startIcon={<DoneIcon />} 
                                disabled={generalInfo.title.length === 0 || generalInfo.description.length === 0 || generalInfo.tags.length === 0}
                                onClick={handleSubmit}
                            >
                                Publish
                            </Button>
                        </Grid>
                    </Grid>
                }
                <Grid item xs={12} md={6} style={{ alignSelf: 'baseline' }}>
                    <Grid container direction="column" className={classes.formContainer} spacing={2}>
                        <Grid item md={12} style={{ marginBottom: '10px' }}>
                            <Typography variant='h6'>General Info</Typography> 
                            <Typography variant='body2' className={classes.description}>Make sure you add the correct tags to get better results</Typography>
                
                        </Grid>
                        <Grid item md={12}>
                            <TextField className={classes.titleField} variant="outlined" name="title" label="Title" size="small" onChange={handleChange} value={generalInfo.title} />
                        </Grid>
                        <Grid item md={12}>
                            <TextField className={classes.descriptionField} multiline rows={6} variant="outlined" name="description" label="Description" size="small" onChange={handleChange} value={generalInfo.description} />
                        </Grid>
                        <Grid item md={12}  style={{ padding: '0px 15px' }}>
                            <Tags postData={generalInfo} setPostData={setGeneralInfo}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} style={{ alignSelf: 'baseline' }}>
                    <Grid container direction="column" className={classes.formContainer} spacing={2}>
                        <Grid item md={12}>
                            <Typography variant='h6'>Questions (Optional)</Typography>
                            <Typography variant='body2' className={classes.description}>You can add up to 5 questions</Typography>
                        </Grid>
                        <Grid item md={12}>
                            {
                                questions
                            }
                            <Grid container direction="row-reverse" className={classes.addQuestionContainer}>
                                <Button variant="contained" startIcon={<AddIcon />} color="primary" size="small" className={classes.addQuestionButton} onClick={addQuestion} disabled={questionObjs.length === 5}>Add</Button>
                                <Button variant="outlined" color="secondary" size="small" className={classes.addQuestionButton} onClick={removeQuestion} disabled={questionObjs.length === 1}>Remove</Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {!matches &&
                    <Grid container direction="row-reverse">
                        <Button 
                            color="primary" 
                            variant="text" 
                            startIcon={<DoneIcon />} 
                            disabled={generalInfo.title.length === 0 || generalInfo.description.length === 0 || generalInfo.tags.length === 0}
                        >
                            Publish
                        </Button>
                    </Grid>
                }
            </Grid>
        </Container>
        </>
    );
}

export default RequestPost;


const Question = ({ number, questionObjs, setQuestionObjs}) => {
    const classes = useStyles();
    
    const handleChange = (e) => {
        questionObjs[number - 1] = e.target.value;
    }

    return(
        <TextField className={classes.question} variant="filled" name={`question-${number}`} label={`Question ${number}`} size="small" onChange={handleChange}/>
    );
}