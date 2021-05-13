import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    container: {
        padding: '60px 40px',
        [theme.breakpoints.down('sm')]: {
            padding: '60px 15px',
        },
    },
    title: {
        fontFamily: 'MetropolisBold',
    },
    filterContainer:{
        [theme.breakpoints.down('sm')]: {
            marginTop: '40px'
        },
    },
    divider: {
        color: 'rgb(0 0 0 / 10%)',
        margin: '15px 0',
        width: '60%'
    },
    searchField: {
        fontSize: '12px'
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
    searchTitle: {
        fontFamily: 'MetropolisBold',
        marginLeft: '10px'
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },

}));