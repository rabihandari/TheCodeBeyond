import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    minHeight: '1000px',
  },
  postContainer: {
    maxWidth: '680px',
    padding: '80px 24px',
    display: 'block',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 24px',
    },
  },
  mdMediaHolder: {
    height: '480px',
    marginTop: "40px",
    [theme.breakpoints.down('xs')]: {
      height: '200px',
    },
  },
  mdMedia: {
    height: '100%',
    display: 'block',
  },
  mdBody: {
    marginTop: "60px",
  },
  leftContainer: {
    position: 'fixed',
    top: '40%',
    left: '15%',
  },
  divider: {
    padding: '40px',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '20px',
    },
  }
}));