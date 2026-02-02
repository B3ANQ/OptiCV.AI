import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CVGenerator from './pages/CVGenerator';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/index.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/cv-generator" component={CVGenerator} />
                <Route path="/subscription" component={Subscription} />
                <Route path="/profile" component={Profile} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;