import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    profilePicture: {
        marginLeft: '20px',
        height: '34px',
        width: '34px',
        cursor: 'pointer',
        fontSize: '16px',
        backgroundColor: 'blue'
    },
    dropDownHeader: {
        margin: '0px',
        padding: '15px',
    },
    headerPicture: {
        height: '34px',
        width: '34px',
        fontSize: '16px',
        backgroundColor: 'blue',
    },
    menuItem: {
        fontSize: '14px',
        fontWeight: '300',
        padding: '8px 20px',
    },
    dropDownListContainer: {
        marginTop: '20px',
    },
    dropDownList: {
        marginTop: '10px',
    },
}));