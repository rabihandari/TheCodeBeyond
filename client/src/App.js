import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CreatePost from './pages/CreatePost/CreatePost';
import { getPosts } from './actions/posts';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    return(
        <Router>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/createPost" component={CreatePost} />
        </Router>
    );
}

export default App;