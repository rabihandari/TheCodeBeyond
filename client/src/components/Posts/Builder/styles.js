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
  mdTitle: {
    fontFamily: 'librebasker ville',
    fontWeight: '700',
    textAlign: 'center',
  },
  mdHeaderContent: {
    fontFamily: 'MetropolisMedium',
    textAlign: 'center',
    marginTop: "10px",
    fontSize: '12px',
  },
  mdMediaHolderSmall: {
    height: '300px',
    marginTop: "40px",
    [theme.breakpoints.down('md')]: {
      height: '200px',
    },
  },
  mdMediaHolderLarge: {
    height: '500px',
    marginTop: "40px",
    [theme.breakpoints.down('md')]: {
      height: '200px',
    },
  },
  mdMedia: {
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100%',
    width: 'auto',
    display: 'block',
  },
  mdDescription: {
    fontFamily: 'MetropolisRegular',
    textAlign: 'center',
    marginTop: "20px",
  },
  mdBody: {
    marginTop: "40px",
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
    marginTop: '30px',
    marginRight: '10px',
    textTransform: 'none',
  },
}));