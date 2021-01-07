import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '30px',
    },
    title: {
        color: '#FFF',
        fontFamily: 'MetropolisBold',
        fontSize: '14px',
        paddingBottom: '40px',
        lineHeight: '1.286',
        letterSpacing: '.25rem',
        textTransform: 'uppercase',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
          },
    },
    listItem: {
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