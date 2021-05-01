import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    mainContainer: {
        padding: '50px',
        maxWidth: '1200px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 20px',
        },
    }
}))