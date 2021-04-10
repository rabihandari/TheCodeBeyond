import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    profilePicture: {
        height: '48px',
        width: '48px',
        cursor: 'pointer',
        backgroundColor: 'blue'
    },
    profileSection: {
      padding: '20px 0',
    },
    userName: {
      color: 'black',
      display: 'block',
      marginLeft: '15px',
    },
    createdAt: {
      fontFamily: 'MetropolisRegular',
      color: 'grey',
      display: 'block',
      marginLeft: '15px',
    },
    mdTitle: {
      fontFamily: 'librebasker ville',
      fontWeight: '700',
    },
    mdDescription: {
      fontFamily: 'MetropolisRegular',
      marginTop: "20px",
    },
    menuItemContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    menuItemText: {
        fontSize: '14px',
        fontWeight: '300',
    },
    socialMediaButton: {
      outline: 'none',
    },
    
    socialMediaIcon: {
      minWidth: '0px', 
      marginRight: '20px'
    },
}));