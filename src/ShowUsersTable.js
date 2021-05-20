import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";

const styles = {
  UserDetailsTable: {
    width: "100%",
    textAlign: "center",
  },

  UserDetailsTableHead: {
    backgroundColor: "black",

    "& th": {
      color: "white",
      fontWeight: "bold",
    },
  },

  UserDetailsTable_empty: {
    align: "center",
  },

  UserDetailsRows: {
    padding: "10px",

    "&:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
};

class ShowUsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAPIdata();
  }

  fetchAPIdata = async () => {
    const apiData = await axios.get(`http://localhost:2000/users`);
    const users = apiData.data;
    this.setState({ users });
  };

  deleteUser = async (id) => {
    await axios.delete(`http://localhost:2000/users/${id}`);
    window.location.reload();
    // this.props.history.push("/show_users_table");
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Table className={classes.UserDetailsTable}>
          <TableHead className={classes.UserDetailsTableHead}>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state ? (
              this.state.users.map((data) => (
                <TableRow key={data.id} className={classes.UserDetailsRows}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.username}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.website}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <Link aria-label="edit" to={`/editUser/${data.id}`}>
                        <EditIcon color="primary" />
                      </Link>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <Link
                        aria-label="delete"
                        to={`#`}
                        onClick={() => this.deleteUser(data.id)}
                      >
                        <DeleteIcon color="secondary" />
                      </Link>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={classes.UserDetailsRows}>
                <TableCell colSpan="7">No Data in Table</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(ShowUsersTable);
