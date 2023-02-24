import { BrowserRouter, Switch, Route } from "react-router-dom";
/* import { Routes } from "react-router"; */

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import Upload from "./Components/Upload";
import EachPostItem from "./Components/EachPostItem";
import Notfound from "./Components/Notfound";
import MyPost from "./Components/MyPost";
import EditBio from "./Components/EditBio";
import EditPost from "./Components/EditPost";
import MypostFullView from "./Components/MypostFullView";
import Help from "./Components/Help";
import Protected from "./Components/Protected";
import Landing from "./Components/Landing";
import User from "./Components/User";
import About from "./Components/About";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Protected exact path="/about" component={About} />
      <Protected exact path="/help" component={Help} />
      <Protected exact path="/myposts" component={MyPost} />
      <Protected exact path="/feed" component={Feed} />
      <Protected exact path="/post" component={Upload} />
      <Protected exact path="/posts/:id" component={EachPostItem} />
      <Protected exact path="/user/:id" component={User} />
      <Protected exact path="/editbio" component={EditBio} />
      <Protected exact path="/edit/:id" component={EditPost} />
      <Protected exact path="/view/:id" component={MypostFullView} />
      <Protected component={Notfound} />
    </Switch>
  </BrowserRouter>
);

export default App;
