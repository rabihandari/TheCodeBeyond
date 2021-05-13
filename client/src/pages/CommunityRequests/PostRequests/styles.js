import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        marginTop: '30px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 0px',
            marginTop: '0px',
        }
    },
    nothingTitle: {
        textAlign: 'center',
        marginTop: '80px',
    },
    nothingDesc: {
        textAlign: 'center',
        fontSize: '12px',
        marginTop: '10px',
    },
    goBack: {
        textTransform: 'none',
        marginTop: '20px',
        display: 'box',
        margin: 'auto'
    },
    loadMore: {
        margin: '10px 10px',
        textTransform: 'none',
        fontSize: '14px'
    }
}))
