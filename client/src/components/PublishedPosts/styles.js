import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '40px 20px',
    },
    title: {
        display: 'block',
        fontWeight: '800',
    },
    description: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
        marginBottom: '10px'
    },
    createdAt: {
        display: 'block',
        fontFamily: 'MetropolisRegular',
        color: 'grey',
        marginBottom: '30px',
    }
}));