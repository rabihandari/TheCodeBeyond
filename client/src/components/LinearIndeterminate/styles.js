import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';


export const CustomIndeterminate = withStyles((theme) => ({
    colorPrimary: {
      backgroundColor: '#000',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#FFF',
    },
  }))(LinearProgress);