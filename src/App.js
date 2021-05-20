import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import AddUser from "./AddUser";
import ShowUsersTable from "./ShowUsersTable";

const styles = {
  link_btn: {
    backgroundColor: "#0099cc",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    borderRadius: "5px",
    margin: "10px",
    "&:visited": {
      backgroundColor: "#0099cc",
      color: "white",
      padding: "10px 20px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      borderRadius: "5px",
      margin: "10px",
    },
  },
};

function App(props) {
  const { classes } = props;

  return (
    <Router>
      <div className="App">
        <Link to="/" className={classes.link_btn}>
          Home
        </Link>

        <Link to="/show_users_table" className={classes.link_btn}>
          Show User Table
        </Link>

        <Link to="/addUser" className={classes.link_btn}>
          Add User
        </Link>
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route exact path="/show_users_table" component={ShowUsersTable} />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path="/editUser/:id" component={AddUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default withStyles(styles)(App);
