import { makeStyles } from '@material-ui/core/styles'; 

export default makeStyles((theme) => ({
    container: {
        padding: '140px 0px',
        [theme.breakpoints.down('md')]: {
            padding: '40px '
        }
    },
    image: {
        width: '80%',
        height: 'auto',
        display: 'block',
        margin: 'auto'
    },
    title: {
        fontFamily: 'MetropolisBold'
    },
    desc: {
        fontFamily: 'MetropolisRegular',
        marginTop: '20px',
        fontSize: '13px'
    },
    goHome: {
        backgroundColor: 'blue',
        marginTop: '25px',
        textTransform: 'none',
        borderRadius: '50px',
        fontSize: '12px'
    }
}));