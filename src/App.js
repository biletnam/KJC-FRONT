import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import MainPage from "./pages/main-skeleton/MainPage";
import DirectorMainPage from "./pages/director/main-skeleton/DirectorMainPage";

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/director' component = {DirectorMainPage}/>
                <Route path='/' component = {MainPage}/>
            </div>
        )
    }
}
export default App;