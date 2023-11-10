import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import { getPopularPosts, getPosts, getTrendingPosts } from './actions/posts';
import { oAuthLogin } from './actions/auth';
import { getSettings } from './actions/user';
import * as actionTypes from './actions/actionTypes';
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
import Settings from './pages/Settings/Settings';
import ScrollToTop from './components/Shared/ScrollToTop';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ChangePasswordSuccess from './pages/ChangePassword/Success/Success';
import ActivateAccount from './pages/ActivateAccount/ActivateAccount';
import Feedback from './pages/Feedback/Feedback';
import RequestPost from './pages/RequestPost/RequestPost';
import PrivateRoute from './config/PrivateRoute/PrivateRoute';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Answer from './pages/Answer/Answer';
import CommunityRequests from './pages/CommunityRequests/CommunityRequests';
import NotFound from './pages/404/404';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#333',
        }
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const alert = useSelector(state => state.alert);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);
        let p1 = dispatch(oAuthLogin(getUser()));
        let p2 = dispatch(getPosts(0));
        let p3 = dispatch(getPopularPosts());
        let p4 = dispatch(getTrendingPosts());
        let p5 = dispatch(getSettings());

        Promise.all([p1, p2, p3, p4, p5]).then(() => {
            if(!unmounted){
                setLoading(false);  
            }
        });
        return () => {
            unmounted = true;
        };
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
                    <PrivateRoute path="/createPost" component={CreatePost} componentProps={{editing: false}} />
                    <PrivateRoute path="/edit/:id" component={CreatePost} componentProps={{editing: true}} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/register/success/:email" component={RegisterSuccess} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/login/activation/token-expired" component={TokenExpired} />
                    <Route path="/login/forget-password" component={ForgetPassword} />
                    <Route path="/login/reset-password/success" component={ResetPasswordSuccess} />
                    <Route path="/login/reset-password/:email/:token" component={ResetPassword}/>
                    <PrivateRoute exact path="/saved" component={SavedPosts}/>
                    <PrivateRoute path="/my-posts" component={MyPosts} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <PrivateRoute path="/settings/changePassword/success" component={ChangePasswordSuccess} />
                    <PrivateRoute path="/settings/changePassword/:email" component={ChangePassword} />
                    <PrivateRoute exact path="/request" component={RequestPost} />
                    <PrivateRoute exact path="/answer/:id" component={Answer} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/terms-conditions" component={TermsAndConditions} />
                    <PrivateRoute exact path="/community-requests" component={CommunityRequests} />
                    <Route exact path="/activate" component={ActivateAccount} />
                    <Route path="/feedback/:email" component={Feedback}/>
                    <Route path="/:id/:title" render={(props) => <Post {...props} />} />
                    <Route path='/404' component={NotFound} />
                    <Redirect from='*' to='/404' />
                </Switch>
                {!isLoading &&
                    <Snackbar open={alert.open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={() => dispatch({ type: actionTypes.HIDE_ALERT })} severity={alert.severity}>
                            {alert.message}
                        </Alert>
                    </Snackbar>
                }
            </MuiThemeProvider>
        </Router>
    );
}

export default App;