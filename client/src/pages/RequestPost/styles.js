import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '60px 40px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 20px',
        }
    },
    title: {
        fontFamily: 'MetropolisBold',
    },
    description: {
        fontFamily: 'MetropolisRegular',
        marginTop: '10px',
        fontSize: '12px'
    },
    titleField: {
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    descriptionField: {
        width: '80%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    emailDesc: {
        fontFamily: 'MetropolisRegular',
        color: 'blue'
    },
    formContainer: {
        marginTop: '20px',
    },
    addQuestionContainer: {
        width: '80%',
        padding: '15px 0px ',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
        
    },
    addQuestionButton: {
        marginLeft: '10px',
        textTransform: 'none'
    },
    question: {
        width: '80%',
        marginBottom: '10px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    submitContianer: {
        width: '70%',
    }
}))