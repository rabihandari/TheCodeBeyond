import { makeStyles } from '@material-ui/core/styles'; 

export default makeStyles((theme) => ({
    container: {
        maxWidth: '650px',
        padding: '20px',
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'MetropolisBold'
    },
    body: {
        textAlign: 'center',
        fontFamily: 'MetropolisRegular'
    },
    message: {
        textAlign: 'center',
        fontFamily: 'MetropolisRegular',
        fontSize: '12px'
    },
    submitButton: {
        borderRadius: '20px',
        fontSize: '13px',
        textTransform: 'none',
    },
    cancelButton: {
        borderRadius: '20px',
        fontSize: '13px',
        textTransform: 'none',
    },
}));