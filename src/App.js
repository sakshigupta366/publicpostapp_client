import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
// import TableDatePicker from './datevalidation';
// import About from './about';

function App() {
  return (<>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Register} exact />
          <Route path="/login" component={Login} exact />
          {/* <Route path="/" component={TableDatePicker} exact/> */}
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/about" component={About} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  </>
  );
}

export default App;