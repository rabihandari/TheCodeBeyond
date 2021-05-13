import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '60px 40px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 20px',
        }
    },
    title: {
        fontFamily: 'MetropolisBold',
    },
    description: {
        fontFamily: 'MetropolisRegular',
        marginTop: '10px',
        fontSize: '12px'
    },
    divider: {
        backgroundColor: '#cecece',
    },
}))