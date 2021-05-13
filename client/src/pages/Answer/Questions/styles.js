import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 0px',
        }
    },
    questionsContainer: {
        padding: '30px 20px',
        [theme.breakpoints.down('md')]: {
            padding: '10px',
        }
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'MetropolisBold',
    },
    questionContainer: {
        padding: '10px 0px',
    },
    answerButton: {
        textTransform: 'none',
        fontSize: '14px',
    }
}))