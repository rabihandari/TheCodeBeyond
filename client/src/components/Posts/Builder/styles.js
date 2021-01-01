import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    
  paper: {
    padding: theme.spacing(2),
    margin: '40px 0px',
  },
  title: {
    fontWeight: 'bold',
  },
  form: {
    display: 'block',
    position: 'relative',
  },
  textInput: {
    marginTop: '20px',
  },
  fileInput: {
    marginTop: '20px',
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