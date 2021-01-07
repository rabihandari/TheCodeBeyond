import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
    card: {
        margin: '20px',
    },
    media: {
        paddingTop: '90.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        padding: '20px 0px',
    },
    title: {
        fontFamily: "Libre Baskerville",
        fontWeight: '700',
    },
    createdAt: {
        fontFamily: [
            "metropolis-medium",
            "sans-serif"
        ].join(","),
    },
    description: {
        padding: '24px 0px',
        lineHeight: '1.8',
        fontFamily: [
            "metropolis-medium",
            "sans-serif"
        ].join(","),
        
    },
    tags: {
        color: '#0054a5',
        fontSize: '14px',
    }
}));