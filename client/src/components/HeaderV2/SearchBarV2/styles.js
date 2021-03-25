import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    searchHolder: {
        display: 'flex',
        marginRight: '20px',
    },
    searchIcon: {
        width: '24px',
        height: '24px',
        padding: '5px',
        cursor: 'pointer',
    },
    searchInput: {
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: 'MetropolisRegular',
    },
    option: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'MetropolisRegular',
        padding: '10px 15px',
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },
        '&[data-focus="true"]': {
            backgroundColor: 'rgba(0,0,0,.2)',
            borderColor: 'transparent',
        },
    },
    listBackground: {
        backgroundColor: '#FFF',
    },
    noOption: {
        fontSize: 14,
        fontFamily: 'MetropolisRegular',
        color: 'white',
    }
}));