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
        width: '50%',
        border: '1px solid grey'
    },
    resendActivation: {
        color: 'black',
        textDecoration: 'underline',
        cursor: 'pointer'
        
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '20px',
    },
}))