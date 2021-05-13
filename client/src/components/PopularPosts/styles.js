import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        padding: '20px 0px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 20px',
        }
    },
    titleContainer: {
        padding: '30px 0px',
    },
    title: {
        fontFamily: 'MetropolisRegular',
        fontWeight: '600',
        marginLeft: '10px',
    },
    postsContainer: {
        padding: '20px 0px'
    }
}));