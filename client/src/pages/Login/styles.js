import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    container: {
        padding: '40px 20px',
        maxWidth: '450px',
        [theme.breakpoints.down('md')]: {
            padding: '40px 20px',
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
    },
    forgetPassword: {
        marginTop: '10px',
        textAlign: 'right'
    },
    forgetPasswordText: {
        fontSize: '13px',
        cursor: 'pointer',
        fontFamily: 'MetropolisRegular'
    },
    error: {
        marginTop: '5px',
        color: 'red',
        fontSize: '13px',
    }
}))