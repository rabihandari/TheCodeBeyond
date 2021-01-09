import { makeStyles } from '@material-ui/core/styles';

import searchIcon from '../../../images/icon-search.svg';

export default makeStyles((theme) => ({
    searchHolder: {
        height: '42px',
        background: `url(${searchIcon}) 20px center no-repeat,rgba(0,0,0,.5)`,
        backgroundSize: '20px 20px,auto',
        color: 'rgba(255,255,255,.5)',
        bordeRadius: '20px',
        border: 'none',
    },
    searchInputs: {
        display: 'flex',
        alignItems: 'center',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        height: '42px',
        padding: '0px 0px 0px 60px',
        fontSize: '15px',
        backgroundColor: 'rgb(0 0 0 / 0)',
        color: 'rgba(255,255,255,.5)',
        border: 'none',
        fontFamily: 'MetropolisRegular',
    },
    option: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'MetropolisRegular',
        padding: '10px 15px',
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },
        '&[data-focus="true"]': {
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'transparent',
        },
    },
    listBackground: {
        backgroundColor: '#272727',
    },
    noOption: {
        fontSize: 14,
        fontFamily: 'MetropolisRegular',
        color: 'white',
    }
}));