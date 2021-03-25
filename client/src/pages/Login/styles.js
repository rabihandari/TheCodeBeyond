import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    container: {
        padding: '100px 80px',
        maxWidth: '600px',
        [theme.breakpoints.down('xs')]: {
            padding: '100px 20px',
        },
    },
    logo: {
        width: '70px',
        height: '70px',
        padding: '20px'
    },
    title: {
        padding: '20px 0px',
        textAlign: 'center',
    },
    signin: {
    },
    inputField: {
        marginTop: '20px',
        
    },
    loginButton: {
        height: '50px',
    },
    divider: {
        padding: '5px',
        marginTop: '20px',
        textAlign: 'center',
    },
    googleLogin: {
        width: '100%!important',
        marginBottom: '50px',
    },
    createAccount: {
        marginTop: '20px',
    }
}))