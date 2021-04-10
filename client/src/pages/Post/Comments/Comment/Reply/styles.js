import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container:{
    padding: '15px 25px',
  },
  profilePicture: {
    height: '32px',
    width: '32px',
    cursor: 'pointer',
    backgroundColor: 'blue'
  },
  specialPerson: {
    display: 'block',
    marginLeft: '15px',
    width:'55px',
    textAlign: 'center',
    color: 'white',
    fontSize: '10px',
    borderRadius: '3px',
    padding: '2px'
  },
  menuItemText: {
    fontFamily: 'MetropolisRegular',
    fontSize: '13px',
    fontWeight: '300',
  },
  profileSection: {
    padding: '15px 0',
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
  commentText: {
    fontFamily: 'MetropolisRegular',
    fontSize: '13px',
    color: 'rgba(41, 41, 41, 1)',
  },
  commentInput: {
    fontFamily: 'MetropolisRegular',
    minHeight: '40px',
    width: '95%',
    padding: '10px',
    border: '1px solid #d3d3d3',
    borderRadius: '5px',
    resize: 'none',
    fontSize: '13px',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#c7c7c7'
    }
  },
  replyButtons: {
    marginLeft: '20px',
    borderRadius: '50px',
    textTransform: 'none',
    fontFamily: 'MetropolisRegular',
    fontSize: '11px',
  },
  cancelButton: {
    cursor: 'pointer'
  },
  
  footerContainer: {
    marginTop: '20px',
  },
}));