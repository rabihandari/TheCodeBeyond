import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';


export const CustomIndeterminate = withStyles((theme) => ({
    root: {
      height: 3,
      borderRadius: 10,
    },
    colorPrimary: {
      backgroundColor: '#FFF',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#aeaeae',
    },
  }))(LinearProgress);