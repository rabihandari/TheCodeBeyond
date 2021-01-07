import { makeStyles } from '@material-ui/core/styles';

import emailIcon from '../../../images/icon-mail.svg';

export default makeStyles((theme) => ({
    container: {
        padding: '30px 60px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 10px',
          },
    },
    title: {
        color: '#FFF',
        fontFamily: 'MetropolisBold',
        fontSize: '14px',
        paddingBottom: '40px',
        lineHeight: '1.286',
        letterSpacing: '.25rem',
        textTransform: 'uppercase',
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
          },
    },
    divider: {
        maxWidth: '200px',
        backgroundColor: "rgba(255,255,255,.2)",
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
          },
    },
    
    description: {
        padding: '10px 0px',
        color: 'rgba(255,255,255,.4)',
        fontFamily: 'MetropolisRegular',
        fontSize: '15px',
        display: 'block',
        lineHeight: '2',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
          },
    },
    form: {
        width: '100%',
        position: 'relative',
    },
    emailHolder: {
        width: '100%',
        height: '58px',
        background: `url(${emailIcon}) 20px center no-repeat,rgba(0,0,0,.2)`,
        backgroundSize: '24px 16px,auto',
        marginBottom: '1.8rem',
        color: 'rgba(255,255,255,.5)',
        bordeRadius: '3px',
        border: 'none',
    },
    emailInput: {
        width: '100%',
        height: '58px',
        padding: '0px 0px 0px 60px',
        fontSize: '15px',
        backgroundColor: 'rgb(0 0 0 / 0)',
        color: 'rgba(255,255,255,.5)',
        border: 'none',
        textDecoration: 'none',
        fontFamily: 'MetropolisRegular',
        outline: 'none',
    },
    submit: {
        position: 'absolute',
        top: '0',
        right: '0',
        color: '#fff',
        background: '#0054a5',
        borderColor: '#0054a5',
        padding: '0px 15px',
        height: '58px',
        borderRadius: '0 3px 3px 0',
        display: 'inline-block',
        fontFamily: 'MetropolisBold',
        fontSize: '12px',
        letterSpacing: '3px',
        textDecoration: 'none',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        border: '.2rem solid #c5c5c5',
        cursor: 'pointer',
        userSelect: 'none',

    },
}));