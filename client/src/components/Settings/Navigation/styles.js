import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    navigatorContainer: {
        padding: '10px 20px',
        position: 'sticky',
        top: '50px'
    },
    navigatorTitle: {
        fontSize: '22px',
        marginBottom: '30px',
        fontWeight: '700'
    },
    navigatorItem: {
        fontSize: '16px',
        color: 'rgba(0,0,0,.54)',
        fill: 'rgba(0,0,0,.54)',
        fontFamily: 'MetropolisRegular',
        marginBottom: '30px',
        cursor: 'pointer'
    }
}))