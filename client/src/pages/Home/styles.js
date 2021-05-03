import { makeStyles } from '@material-ui/core/styles'; 

export default makeStyles((theme) => ({
    container: {
        minHeight: '1000px',
        padding: '0px 24px',
        [theme.breakpoints.down('md')]: {
            padding: '0px'
        }
    },
}));