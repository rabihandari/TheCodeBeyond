import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    sectionTitle: {
        fontSize: '22px',
        marginBottom: '30px',
        fontWeight: '700'
    },
    sectionBody: {
        padding: '0px',
        listStyle: 'none'
    },
    itemContainer: {
        padding: '20px 0px',
    },
    itemTitle: {
        fontSize: '20px',
        fontWeight: '700'
    },
    itemValue: {
        marginTop: '10px',
        color: 'black',
        display: 'block',
    },
    inputField: {
        marginTop: '10px',
        color: 'black',
        display: 'block',
        padding: '10px',
        fontWeight: '700',
        border: '1px solid grey'
    },
    bioField: {
        marginTop: '10px',
        width: '80%',
        color: 'black',
        display: 'block',
        padding: '10px',
        fontWeight: '700',
        border: '1px solid grey'
    },
    itemValueEmpty: {
        marginTop: '10px',
        color: '#bbbbbb',
        marginBottom: '10px',
    },
    editButton: {
        borderRadius: '20px',
        textTransform : 'none',
        fontSize: '12px',
        marginRight: '10px'
    },
    itemDescription: {
        fontFamily: 'MetropolisRegular',
        display: 'block',
        marginTop: '20px',
    },
    profilePicture: {
        height: '80px',
        width: '80px',
        margin: 'auto',
        fontSize: '22px',
        marginTop: '20px',
    },
    editProfile: {
        height: '80px',
        width: '80px',
        margin: 'auto',
        marginTop: '20px',
        cursor: 'pointer',
    },
    profileOverlay: {
        position: 'absolute',
        height: '80px',
        width: '80px',
        cursor: 'pointer',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#0000006e'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '20px',
    },
}))