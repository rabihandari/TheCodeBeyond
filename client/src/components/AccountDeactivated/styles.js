import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'top',
        padding: '50px 0px',
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
    reactivate: {
        marginTop: '40px',
        borderRadius: '50px',
        textTransform: 'none',
        margin: '0px 5px'
    },
    paginationController: {
        marginTop: '40px',
    },
}));