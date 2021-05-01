import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    sectionsContainer: {
        padding: '10px 20px',
        [theme.breakpoints.down('md')]:{
            padding: '10px',
        }
    },
    sectionContainer: {
        paddingBottom: '60px',
    },
}))