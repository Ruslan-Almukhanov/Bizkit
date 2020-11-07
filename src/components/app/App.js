import React from "react";
import Home from "../home";
import SideBar from '../sidebar';
import Clients from '../clients';
import { BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <Route exact path='/' component={Home}/>
      <div style={{display: 'flex'}}>
        <div>
            <Route path='/clients' component={SideBar} />
        </div>
          <div style={{ width: '100%' }}>
            <Route path='/clients' component={Clients}/>
        </div>
      </div>
    </Router>
    </>
  );
};

export default App;
