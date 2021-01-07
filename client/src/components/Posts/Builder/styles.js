import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    
  container: {
    padding: '80px 0px',
    margin: '40px 0px',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'MetropolisBold',
  },
  form: {
    display: 'block',
    position: 'relative',
  },
  textInput: {
    marginTop: '20px',
  },
  fileInput: {
  },
  buttonSubmit: {
    marginTop: '20px',
    textTransform: 'none',
    backgroundColor: 'black',
    '&:hover': {
        backgroundColor: 'grey',
    },
  },
}));