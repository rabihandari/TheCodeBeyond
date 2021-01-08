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
  mdMedia: {
    width: '100%',
    height: '300px',
    marginTop: "40px",
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
    marginTop: '20px',
    marginRight: '10px',
    textTransform: 'none',
  },
}));