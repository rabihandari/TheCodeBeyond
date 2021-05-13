import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core'; 

import useStyles from './styles';


const Questions = ({ questions, postData, setPostData }) => {
    const classes = useStyles();
    

    return(
        <div className={classes.container}>
            <Typography variant="h4" className={classes.title}>Questions</Typography>
            <Grid container direction="column" className={classes.questionsContainer}>
                {questions.map((question, index) => (
                    <Question key={question} question={question} postData={postData} index={index} setPostData={setPostData}/>
                ))}
            </Grid>
        </div>
    );
}


export default Questions


const Question = ({ question, index, postData, setPostData }) => {
    const classes = useStyles();
    const [answered, setAnswered] = useState(false);


    useEffect(() => {
        setAnswered(postData.body.includes(question));
    }, [postData.body, question]);

    const handleAnswerButton = () =>{
        if(!answered){
            setPostData({ ...postData, body: (postData.body + `\n\n## ${question}\n`) })
            setAnswered(true);
        }else{
            setPostData({ ...postData, body: (postData.body.replace(`## ${question}`, '')) })
            setAnswered(false);
        }
    }

    return(
        <Grid container className={classes.questionContainer} alignItems="baseline" justify="space-between">
            <Grid item md={9}>
                <Typography variant="body1">{index + 1} - {question}</Typography>
            </Grid>
            <Grid item md={2}>
                <Button variant="text" className={classes.answerButton} onClick={handleAnswerButton} style={ answered ? { color: '#00bf00' } : { color: 'black' } }>{answered ? 'Answered' : 'Answer'}</Button>
            </Grid>
        </Grid>
    );
}