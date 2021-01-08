import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    chipsContainer: {
      display: 'flex',
      justifyContent: 'start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: '20px 0px',
      margin: 0,
    },
    chip: {
      marginRight: '10px',
      marginBottom: '10px',
      transition: '1s',
    },
    addIcon: {
      transition:  '0.3s ease all',
    },
    button: {
        margin: '20px 0px',
    },
}));