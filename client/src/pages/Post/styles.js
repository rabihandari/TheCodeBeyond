import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    minHeight: '1000px',
  },
  postContainer: {
    maxWidth: '800px',
    padding: '80px 24px',
    display: 'block',
    margin: 'auto',
  },
  mdTitle: {
    fontFamily: 'librebasker ville',
    fontWeight: '700',
    textAlign: 'center',
  },
  mdHeaderContent: {
    fontFamily: 'MetropolisMedium',
    textAlign: 'center',
    marginTop: "20px",
    fontSize: '14px',
  },
  mdMediaHolder: {
    height: '480px',
    marginTop: "60px",
    [theme.breakpoints.down('md')]: {
      height: '200px',
    },
  },
  mdMedia: {
    height: '100%',
    width: 'auto',
    display: 'block',
    background: 'center  no-repeat',
  },
  mdDescription: {
    fontFamily: 'MetropolisBold',
    textAlign: 'center',
    marginTop: "40px",
    
  },
  mdBody: {
    marginTop: "60px",
  },
}));