import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/Post/Post';
import { getPopularPosts, getPosts } from './actions/posts';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
    }
    
    return(
        <Router>
            <MuiThemeProvider theme={theme}>
                <ScrollToTop/>
                <Header fetchPosts={fetchPosts} setSelectedTitle={setSelectedTitle}/>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} fetchPosts={fetchPosts} page={page} setPage={setPage} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>}/>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/createPost" component={CreatePost} />
                    <Route exact path="/:id/:title" render={(props) => <Post {...props} />} />
                    <Route component={Contact} />
                </Switch>
                <Footer />
            </MuiThemeProvider>
        </Router>
    );
}

export default App;