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
import SavedPosts from './pages/SavedPosts/SavedPosts';
import MyPosts from './pages/MyPosts/MyPosts';
import ScrollToTop from './components/Shared/ScrollToTop';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#333',
        }
    },
});

const App = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let p1 = dispatch(oAuthLogin(getUser()));
        let p2 = dispatch(getPosts(0));
        let p3 = dispatch(getPopularPosts());

        Promise.all([p1, p2, p3]).then(() => {
            setLoading(false);
        });
    }, [dispatch]);

    const fetchPosts = (page, keyword=selectedTitle, tags=selectedTags) => {
        setLoading(true);
        dispatch(getPosts(page, {"keyword": keyword, "tags": tags})).then(() => {
            setLoading(false);
        });
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
                    <Route exact path="/" render={(props) => <Home {...props} fetchPosts={fetchPosts} page={page} setPage={setPage} selectedTags={selectedTags} setSelectedTags={setSelectedTags} selectedTitle={selectedTitle} isLoading={isLoading}/>}/>
                    <Route path="/createPost" render={(props) => <CreatePost {...props} editing={false}/>} />
                    <Route path="/edit/:id" render={(props) => <CreatePost {...props} editing={true} />} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/register/success/:email" component={RegisterSuccess} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/login/activation/token-expired" component={TokenExpired} />
                    <Route path="/login/forget-password" component={ForgetPassword} />
                    <Route path="/login/reset-password/success" component={ResetPasswordSuccess} />
                    <Route path="/login/reset-password/:email/:token" component={ResetPassword}/>
                    <Route exact path="/saved" component={SavedPosts}/>
                    <Route path="/:id/:title" render={(props) => <Post {...props} />} />
                    <Route path="/my-posts" component={MyPosts} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;