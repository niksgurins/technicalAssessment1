import { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from './components/header/header';
import Home from "./components/home/home";
import Customers from "./components/customers/customers";
import './app.css';

const App = () => {
    const [location, setLocation] = useState(window.location.pathname);

    return (
        <BrowserRouter>
            <div className="app">
                <Header location={location} setLocation={setLocation} />
                <div className="content" id="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/customers" render={(props) => (<Customers setLocation={setLocation} {...props} />)} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;