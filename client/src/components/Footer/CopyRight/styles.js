import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '30px',
    },
    copyRight: {
        padding: '10px 0px',
        color: 'rgba(255,255,255,.4)',
        fontFamily: 'MetropolisRegular',
        fontSize: '15px',
        display: 'block',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
          },
    },
}));