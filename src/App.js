import React from "react";
import Layout from "./Components/Layout";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Quiz from "./Components/pages/Quiz";
import Result from "./Components/pages/Result";
import Signup from "./Components/pages/Signup";
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from "./Contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
            <PrivateRoute exact path="/result/:id" component={Result} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
