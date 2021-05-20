import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
// import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const styles = {
  TextFieldDivs: {
    paddingBottom: "15px",
  },

  TextFieldContainerDiv: {
    display: "flex",
    flexDirection: "column",
  },

  CreateUpdateUserFormFields: {
    width: "100%",
  },
};

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     errorEmployeeName: "",
      errorEmail: "",
      errorPhone: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    };

    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.fetchUserData(id);
    }
  }

  fetchUserData = async (id) => {
    const users = await axios.get(`http://localhost:2000/users/${id}`);
    const { name, username, email, phone, website } = users.data;
    this.setState({ name, username, email, phone, website });
  };

  handleFormEntries = (event) => {
    const { name, value } = event.target;
       let errorEmployeeName, errorEmail, errorPhone;
    if (name === "name" && !value.match(/^[a-zA-Z ]+$/)) {
      errorEmployeeName = "Enter Characters Only";
    }

    if (name === "email" && !value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      errorEmail = "Enter Valid Email ID";
    }

    if (name === "phone" && value.match(/^[a-zA-Z ]+$/)) {
      errorPhone = "Enter Numeric Value Only";
    }

    this.setState({ [name]: value, errorEmployeeName, errorEmail, errorPhone });
    return true;
  };

  handleCreateUpdateUser = (event) => {
    event.preventDefault();
    const { name, username, email, phone, website } = this.state;
    if (
      name.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      website.trim() === "" ||
       !name.match(/^[a-zA-Z ]+$/) ||
      !email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/) ||
      phone.match(/^[a-zA-Z ]+$/)
    ) {
      return;
    } else {
      const user = { name, username, email, phone, website };

      this.props.match.params.id
        ? this.editUserData(user, this.props.match.params.id)
        : this.addUserData(user);
    }
  };

  addUserData = async (user) => {
    await axios.post("http://localhost:2000/users", user);
    // return <Redirect to="/somewhere/else" />;
    this.props.history.push("/show_users_table");
  };

  editUserData = async (user, id) => {
    await axios.put(`http://localhost:2000/users/${id}`, user);
    this.props.history.push("/show_users_table");
  };

  render() {
    const { classes } = this.props;
    const {  errorEmployeeName,
      errorEmail,
      errorPhone, name, username, email, phone, website } =
      this.state;

    // console.log(errorEmployeeName, name, username, email, phone, website);
    return (
      <>
        <form onSubmit={this.handleCreateUpdateUser}>
          <h3>Enter User Details</h3>
          <div className={classes.TextFieldContainerDiv}>
            <div className={classes.TextFieldDivs}>
              <TextField
                name="name"
                placeholder="Name"
                variant="outlined"
                className={classes.CreateUpdateUserFormFields}
                multiline
                value={name}
                onChange={this.handleFormEntries}
                 error={errorEmployeeName ? true : false}
                label={errorEmployeeName ? errorEmployeeName : "Employee Name"}
              />
            </div>

            <div className={classes.TextFieldDivs}>
              <TextField
                name="username"
                placeholder="Username"
                variant="outlined"
                className={classes.CreateUpdateUserFormFields}
                value={username}
                onChange={this.handleFormEntries}
                label="Username"
              />
            </div>

            <div className={classes.TextFieldDivs}>
              <TextField
                name="email"
                placeholder="Employee Email"
                variant="outlined"
                className={classes.CreateUpdateUserFormFields}
                value={email}
                onChange={this.handleFormEntries}
               // label="Employee Email"
               error={errorEmail ? true : false}
                label={errorEmail ? errorEmail : "Employee Email"}
              />
            </div>

            <div className={classes.TextFieldDivs}>
              <TextField
                name="phone"
                placeholder="Phone Number"
                variant="outlined"
                className={classes.CreateUpdateUserFormFields}
                value={phone}
                onChange={this.handleFormEntries}
               // label="Phone Number"
                 error={errorPhone ? true : false}
                label={errorPhone ? errorPhone : "Phone Number"}
              />
            </div>

            <div className={classes.TextFieldDivs}>
              <TextField
                name="website"
                placeholder="Website"
                variant="outlined"
                className={classes.CreateUpdateUserFormFields}
                value={website}
                onChange={this.handleFormEntries}
                label="Website"
              />
            </div>
          </div>
          <Button color="primary" type="submit" variant="contained">
            {this.props.match.params.id ? "Update" : "Create"}
          </Button>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(AddUser);
