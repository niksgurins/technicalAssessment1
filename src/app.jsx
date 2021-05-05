// React Imports
import { Route, BrowserRouter} from "react-router-dom";
import { useEffect } from 'react';

// Component Imports
import Header from './components/header/header';
import Home from "./components/home/home";
import Customers from "./components/customers/customers";

// File imports 
import './app.css';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <div className="content" id="content">
                    <Route exact path="/" component={ Home }/>
                    <Route path="/customers" component={ Customers }/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;