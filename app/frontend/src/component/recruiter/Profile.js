import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    padding: 30,
    minHeight: "93vh",
  },
  paper: {
    padding: 24,
    maxWidth: 800,
    width: "100%",
    margin: "auto",
  },
  input: {
    width: "100%",
  },
  button: {
    marginTop: 24,
    padding: "10px 50px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfileDetails(res.data);
        setPhone(res.data.contactNumber);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Failed to load profile.",
        });
        console.error(err.response?.data);
      });
  };

  const handleUpdate = () => {
    const updatedDetails = {
      ...profileDetails,
      contactNumber: phone ? `+${phone}` : "",
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPopup({
          open: true,
          severity: "success",
          message: res.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Update failed.",
        });
        console.error(err.response);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Paper elevation={3} className={classes.paper}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              label="Name"
              value={profileDetails.name}
              onChange={(e) => handleInput("name", e.target.value)}
              variant="outlined"
              className={classes.input}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Bio (max 250 words)"
              value={profileDetails.bio}
              onChange={(e) => {
                const wordCount = e.target.value.trim().split(/\s+/).length;
                if (wordCount <= 250) handleInput("bio", e.target.value);
              }}
              variant="outlined"
              multiline
              rows={6}
              className={classes.input}
            />
          </Grid>

          <Grid item>
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              inputStyle={{ width: "100%" }}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={handleUpdate}
            >
              Update Details
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Profile;
