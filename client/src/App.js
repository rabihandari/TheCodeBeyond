import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import { getPopularPosts, getPosts } from './actions/posts';
import { oAuthLogin } from './actions/auth';
import HeaderV2 from './components/HeaderV2/HeaderV2';
import Login from './pages/Login/Login'
import TokenExpired from './pages/Login/TokenExpired/TokenExpired';
import ForgetPassword from './pages/Login/ForgetPassword/ForgetPassword';
import Register from './pages/Register/Register'
import RegisterSuccess from './pages/Register/Success/Success'
import ResetPasswordSuccess from './pages/Login/ResetPassword/Success/Success';
import ResetPassword from './pages/Login/ResetPassword/ResetPassword';
import ScrollToTop from './components/Shared/ScrollToTop';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#333',
        }
    }
});

const App = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        dispatch(oAuthLogin(getUser()));
        dispatch(getPosts(0));
        dispatch(getPopularPosts());
    }, [dispatch]);

    const fetchPosts = (page, keyword=selectedTitle, tags=selectedTags) => {
        dispatch(getPosts(page, {"keyword": keyword, "tags": tags}));
        setSelectedTitle(keyword);
        setSelectedTags(tags);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('profile'));
    }
    
    return(
        <Router>
            <MuiThemeProvider theme={theme}>
                <ScrollToTop/>
                <HeaderV2 fetchPosts={fetchPosts} setSelectedTitle={setSelectedTitle}/>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} fetchPosts={fetchPosts} page={page} setPage={setPage} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>}/>
                    <Route path="/createPost" component={CreatePost} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/register/success/:email" component={RegisterSuccess} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/login/activation/token-expired" component={TokenExpired} />
                    <Route path="/login/forget-password" component={ForgetPassword} />
                    <Route path="/login/reset-password/success" component={ResetPasswordSuccess} />
                    <Route path="/login/reset-password/:email/:token" component={ResetPassword}/>
                    <Route path="/:id/:title" render={(props) => <Post {...props} />} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;