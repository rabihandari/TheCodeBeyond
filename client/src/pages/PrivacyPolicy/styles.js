import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '60px 40px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 10px',
        }
    },
}));