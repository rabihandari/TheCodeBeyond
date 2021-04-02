import { Tabs, Tab } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles'

export const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      height: '1px',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        width: '80%',
        backgroundColor: '#000',
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  export const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#000',
      fontWeight: '500',
      minWidth: '100px',
      fontSize: theme.typography.pxToRem(13),
      '&:focus': {
        opacity: 1,
      },
    },
  }))((props) => <Tab disableRipple {...props} />);

  export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '60px 0',
    },
    header: {
        padding: '30px 20px'
    },
    button: {
        textTransform: 'none',
        borderRadius: '20px',
        padding: '5px 20px',
        fontSize: '13px',
    },
  }));