import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import { getPopularPosts, getPosts } from './actions/posts';
import HeaderV2 from './components/HeaderV2/HeaderV2';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login'
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
        dispatch(getPosts(0));
        dispatch(getPopularPosts());
    }, [dispatch]);

    const fetchPosts = (page, keyword=selectedTitle, tags=selectedTags) => {
        dispatch(getPosts(page, {"keyword": keyword, "tags": tags}));
        setSelectedTitle(keyword);
        setSelectedTags(tags);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    return(
        <Router>
            <MuiThemeProvider theme={theme}>
                <ScrollToTop/>
                <HeaderV2 fetchPosts={fetchPosts} setSelectedTitle={setSelectedTitle}/>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} fetchPosts={fetchPosts} page={page} setPage={setPage} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>}/>
                    <Route exact path="/createPost" component={CreatePost} />
                    <Route exact path="/:id/:title" render={(props) => <Post {...props} />} />
                    <Route exact path="/login" component={Login} />
                </Switch>
                <Footer />
            </MuiThemeProvider>
        </Router>
    );
}

export default App;