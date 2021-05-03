import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'top',
        padding: '50px 0px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0px',
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
    goBack: {
        marginTop: '40px',
    },
    paginationController: {
        marginTop: '40px',
    },
}));