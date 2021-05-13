import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        marginTop: '30px',
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 20px',
            marginTop: '0px',
        }
    },
    title: {
        fontFamily: 'MetropolisRegular',
        fontWeight: '600',
        marginLeft: '10px',
    },
    nothingYet: {
        textAlign: 'center',
        marginTop: '10px',
        fontSize: '12px'
    },
    seeAll: {
        textTransform: 'none',
        fontSize: '13px'
    }
}))



export const CustomIndeterminate = withStyles((theme) => ({
    root: {
      height: 1,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: '#FFF',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#3f51b5',
    },
  }))(LinearProgress);