import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import { userType } from "../../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(1),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "#004aad",
    fontWeight: "bold",
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  skillChip: {
    margin: theme.spacing(0.5),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
    applyButton: {
    backgroundColor: '#0be47b',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#34ed94',
    },
    },
}));


const JobDetails = () => {
  const classes = useStyles();
  const { jobId } = useParams();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const response = await axios.get(`${apiList.jobs}/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error.response || error);
        setPopup({
          open: true,
          severity: "error",
          message: error.response?.data?.message || "Failed to fetch job details.",
        });
        setJobDetails(null); // Ensure jobDetails is null on error
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or error)
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId, setPopup]);

  const handleApply = () => {
    // Ensure jobDetails exists before trying to apply
    if (!jobDetails) {
        setPopup({
            open: true,
            severity: "error",
            message: "Job details not loaded yet. Please try again.",
        });
        return;
    }

    axios
      .post(
        `${apiList.jobs}/${jobDetails._id}/applications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.error("Error applying for job:", err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Failed to apply for job.",
        });
      });
  };

  // 1. Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  // 2. Show a message if jobDetails is still null after loading (e.g., if API returned 404)
  if (!jobDetails) {
    return (
      <div className={classes.loadingContainer}>
        <Typography variant="h6" color="textSecondary">
          Job details not found or an error occurred.
        </Typography>
      </div>
    );
  }

  const deadline = new Date(jobDetails.deadline).toLocaleDateString();

  return (
    <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
            <Typography variant="h4" className={classes.title}>
            {jobDetails.title}
            </Typography>
        </Grid>

        {userType() === "applicant" && jobDetails && (
            <Grid item>
            <Button
                variant="contained"
                className={classes.applyButton}
                onClick={handleApply}
            >
                Apply Now
            </Button>
            </Grid>
        )}
        </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <div className={classes.section}>
            <Typography variant="h6"><strong>Description</strong></Typography>
            <Typography variant="body1">
              <div dangerouslySetInnerHTML={{ __html: jobDetails.description }} />
            </Typography>
          </div>

          <div className={classes.section}>
            <Typography variant="h6">Required Skills</Typography>
            {jobDetails.skillsets && jobDetails.skillsets.length > 0 ? ( // Check if skillsets exists
              jobDetails.skillsets.map((skill, index) => (
                <Chip key={index} label={skill} className={classes.skillChip} color="primary" />
              ))
            ) : (
              <Typography variant="body2">No specific skills listed.</Typography>
            )}
          </div>

        </Grid>

        <Grid item xs={12} md={4}>
          <div className={classes.section}>
            <Typography variant="h6"><strong>About the Job</strong></Typography>
            <Typography variant="body1">
              Role: {jobDetails.jobType}
            </Typography>
            <Typography variant="body1">
              Salary: <strong>{jobDetails.salary} per </strong>
            </Typography>
            <Typography variant="body1">
              Duration:{" "}
              {jobDetails.duration !== 0
                ? `${jobDetails.duration} month${jobDetails.duration > 1 ? "s" : ""}`
                : `Flexible`}
            </Typography>
            <Typography variant="body1">
              Application Deadline: {deadline}
            </Typography>
            <Typography variant="body1">
              Positions Available: {jobDetails.maxPositions}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.section}>
            <Typography variant="h6">Rating</Typography>
            <Rating
              value={jobDetails.rating !== -1 ? jobDetails.rating : null}
              readOnly
            />
            {jobDetails.rating === -1 && (
              <Typography variant="body2" color="textSecondary">
                No ratings yet.
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobDetails;