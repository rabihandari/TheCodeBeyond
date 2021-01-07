import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CreatePost from './pages/CreatePost/CreatePost';
import { getPopularPosts, getPosts } from './actions/posts';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        dispatch(getPosts(0));
        dispatch(getPopularPosts());
    }, [dispatch]);

    const fetchPosts = (page) => {
        dispatch(getPosts(page, {"tags": selectedTags}));
    }
    
    return(
        <Router>
            <MuiThemeProvider theme={theme}>
                <Header />
                <Route path="/" render={(props) => <Home {...props} fetchPosts={fetchPosts} page={page} setPage={setPage} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>} exact/>
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/createPost" component={CreatePost} />
                <Footer />
            </MuiThemeProvider>
        </Router>
    );
}

export default App;