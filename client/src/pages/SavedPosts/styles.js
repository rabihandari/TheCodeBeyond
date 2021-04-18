import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '40px 20px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 0px',
        },
    },
    header: {
        padding: '30px 20px'
    },
    button: {
        textTransform: 'none',
        borderRadius: '20px',
        padding: '5px 20px',
        fontSize: '13px',
    },
    title: {
        fontFamily: 'MetropolisRegular',
        fontWeight: '600'
    }
}));
