import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  CircularProgress, // For loading state
  TextField, // For limit input
  MenuItem, // For select options
  Button, // Import Button for the download action
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom"; // To get jobId from URL
import { SetPopupContext } from "../../App"; // Assuming you have a context for popups
import apiList from "../../lib/apiList"; // Assuming apiList contains your backend base URL

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  tableContainer: {
    width: "90%",
    maxHeight: "60vh", // Set a max height for scrollability
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
    overflow: "auto",
    backgroundColor: "#ffffff",
  },
  tableHeader: {
    backgroundColor: "#004aad",
    zIndex: 999,
  },
  tableHeaderCell: {
    backgroundColor: "#004aad",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  tableCell: {
    fontSize: "0.9rem",
    color: "#333333",
  },
  title: {
    marginBottom: theme.spacing(3),
    color: "#004aad",
    fontWeight: "bold",
  },
  controls: {
    marginBottom: theme.spacing(2),
    width: "90%",
    display: "flex",
    justifyContent: "flex-end", // Align input to the right
    alignItems: "center",
  },
  limitInput: {
    width: "150px", // Adjust width as needed
  },
  downloadButton: {
    fontSize: "0.8rem",
    padding: "4px 8px",
  },
}));

const MatchedApplications = () => {
  const classes = useStyles();
  const { jobId } = useParams();
  const setPopup = useContext(SetPopupContext);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchMatchedApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiList.jobs}/${jobId}/matchedApplications?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching matched applications:", error.response || error);
        setPopup({
          open: true,
          severity: "error",
          message: error.response?.data?.message || "Failed to fetch matched applications.",
        });
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchMatchedApplications();
    }
  }, [jobId, limit, setPopup]);

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const getResume = (resumePath) => {
    if (resumePath && resumePath !== "") {
      console.log("resume patha: ", resumePath);
      
      // This is the corrected line for constructing the URL
      const address = `http://localhost:4444${resumePath}`;
      console.log("Attempting to download resume from:", address);

      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          console.error("Error downloading resume:", error.response || error);
          let errorMessage = "Error downloading resume.";
          if (error.response && error.response.status === 404) {
            errorMessage = "Resume file not found on server.";
          } else if (error.message === "Network Error") {
            errorMessage = "Network error. Server might be down or unreachable.";
          }
          setPopup({
            open: true,
            severity: "error",
            message: errorMessage,
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found for this applicant.",
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container item direction="column" alignItems="center" style={{ padding: "10px" }}>
        <Typography variant="h4" className={classes.title}>
          Matched Applications
        </Typography>
      </Grid>

      <div className={classes.controls}>
        <TextField
          select
          label="Show Top Candidates"
          value={limit}
          onChange={handleLimitChange}
          variant="outlined"
          size="small"
          className={classes.limitInput}
        >
          <MenuItem value={5}>Top 5</MenuItem>
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
          <MenuItem value={0}>Show All</MenuItem>
        </TextField>
      </div>

      {loading ? (
        <CircularProgress style={{ margin: "50px" }} />
      ) : applications.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No matched applications found for this job or job ID is missing.
        </Typography>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>CV</TableCell>
                <TableCell className={classes.tableHeaderCell}>Num de Telephone</TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((row) => (
                <TableRow key={row.userId} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>{row.name}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.cv ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.downloadButton}
                        onClick={() => getResume(row.cv)}
                      >
                        View CV
                      </Button>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.telephone || "N/A"}</TableCell>
                  <TableCell className={classes.tableCell}>{row.email || "N/A"}</TableCell>
                  <TableCell className={classes.tableCell}>{row.score} %</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MatchedApplications;