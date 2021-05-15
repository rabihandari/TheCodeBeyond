import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'top',
        padding: '50px 0px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px',
        },
    },
    noResultTitle: {
        fontFamily: "MetropolisBold",
        marginTop: '40px',
        textAlign: 'center',
    },
    noResultDescription: {
        fontFamily: "MetropolisRegular",
        marginTop: '20px',
        textAlign: 'center',
        color: 'gray',
    },
    noResultImage: {
        width: '80%',
        height: 'auto',
        display: 'block',
        margin: 'auto'
    },
    goBack: {
        marginTop: '40px',
    },
    paginationController: {
        marginTop: '40px',
    },
}));