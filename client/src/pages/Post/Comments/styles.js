import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  drawerContainer: {
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      minWidth: '414px',
      maxWidth: '414px',
    },
  },
  header: {
    padding: '20px',
  },
  title: {
    fontFamily: 'MetropolisBold'
  },
  profilePicture: {
    height: '32px',
    width: '32px',
    marginRight: '10px',
    backgroundColor: '#5c6bc0',
  },
  commentContainer: {
    width: '100%',
    padding: '20px 30px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  userName: {
    fontFamily: 'MetropolisRegular',
  },
  commentInputDefault: {
    fontFamily: 'MetropolisRegular',
    width: '95%',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    resize: 'none',
    fontSize: '14px',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#c7c7c7'
    }
  },
  commentInput: {
    fontFamily: 'MetropolisRegular',
    width: '95%',
    margin: '20px 0',
    padding: '10px',
    border: 'none',
    resize: 'none',
    fontSize: '14px',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#c7c7c7'
    }
  },
  pulishBox: {
    fontFamily: 'MetropolisRegular',
    fontSize: '13px',
  },
  button: {
    fontFamily: 'MetropolisRegular',
    fontSize: '12px',
    borderRadius: '40px',
    textTransform: 'none',
  },
  loginButton: {
    marginTop: '20px',
    textTransform: 'none',
    fontSize: '12px',
  },
}));


export const CustomIndeterminate = withStyles((theme) => ({
    root: {
      height: 1,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: '#FFF',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#3f51b5',
    },
  }))(LinearProgress);