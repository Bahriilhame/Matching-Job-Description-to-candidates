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
  CircularProgress,
  TextField, // Keep TextField for number input
  MenuItem,
  Button,
  Avatar,
  Chip,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

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
    maxHeight: "60vh",
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
    padding: theme.spacing(1),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(1),
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)",
  },
  filterInput: {
    width: "100%",
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
      padding: theme.spacing(0.75, 1),
    },
  },
  downloadButton: {
    fontSize: "0.8rem",
    padding: "4px 8px",
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const MatchedApplications = () => {
  const classes = useStyles();
  const { jobId } = useParams();
  const setPopup = useContext(SetPopupContext);

  const [fullApplicationsList, setFullApplicationsList] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  // Experience filter is now a string/number
  const [experienceFilter, setExperienceFilter] = useState("");
  const [diplomaTypeFilter, setDiplomaTypeFilter] = useState([]);
  const [addressFilter, setAddressFilter] = useState([]);
  const [establishmentFilter, setEstablishmentFilter] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState([]);

  // uniqueExperiences might not be needed for direct input, but useful for initial validation or display
  const [uniqueExperiences, setUniqueExperiences] = useState([]);
  const [uniqueDiplomaTypes, setUniqueDiplomaTypes] = useState([]);
  const [uniqueAddresses, setUniqueAddresses] = useState([]);
  const [uniqueEstablishments, setUniqueEstablishments] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);
  const [uniqueSkills, setUniqueSkills] = useState([]);

  useEffect(() => {
    const fetchAllApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiList.jobs}/${jobId}/matchedApplications?limit=0`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFullApplicationsList(response.data);

        // Collect unique values for other filters (except experience, which is now input-based)
        const experiences = new Set(); // Still collect for potential future use or display
        const diplomaTypes = new Set();
        const addresses = new Set();
        const establishments = new Set();
        const specialties = new Set();
        const skills = new Set();

        response.data.forEach((app) => {
          if (app.extractedData) {
            if (app.extractedData.expérience && Array.isArray(app.extractedData.expérience)) {
              app.extractedData.expérience.forEach((exp) => {
                if (exp.durée !== undefined && exp.durée !== null) {
                  experiences.add(exp.durée);
                }
              });
            }
            if (app.extractedData.formation && Array.isArray(app.extractedData.formation)) {
              app.extractedData.formation.forEach((edu) => {
                if (edu.type) {
                  diplomaTypes.add(edu.type);
                }
                if (edu.établissement) {
                  establishments.add(edu.établissement);
                }
                if (edu.spécialité) {
                  specialties.add(edu.spécialité);
                }
              });
            }
            if (app.extractedData.contact?.adresse) {
              addresses.add(app.extractedData.contact.adresse);
            }
            if (app.extractedData.compétences) {
              Object.values(app.extractedData.compétences).forEach((skillArray) => {
                if (Array.isArray(skillArray)) {
                  skillArray.forEach(skill => {
                    if (skill) skills.add(skill);
                  });
                }
              });
            }
          }
        });

        setUniqueExperiences(Array.from(experiences).sort((a, b) => a - b)); // Sort numerically
        setUniqueDiplomaTypes(Array.from(diplomaTypes).sort());
        setUniqueAddresses(Array.from(addresses).sort());
        setUniqueEstablishments(Array.from(establishments).sort());
        setUniqueSpecialties(Array.from(specialties).sort());
        setUniqueSkills(Array.from(skills).sort());

      } catch (error) {
        console.error("Error fetching matched applications:", error.response || error);
        setPopup({
          open: true,
          severity: "error",
          message: error.response?.data?.message || "Failed to fetch matched applications.",
        });
        setFullApplicationsList([]);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchAllApplications();
    }
  }, [jobId, setPopup]);

  useEffect(() => {
    let currentFiltered = fullApplicationsList;

// Experience Filter: Check if candidate's max experience is >= the input
    if (experienceFilter !== "" && !isNaN(parseFloat(experienceFilter))) {
      const minYears = parseFloat(experienceFilter); // User input is already parsed
      console.log('minYears :', minYears);
      
      currentFiltered = currentFiltered.filter(app => {
        if (!app.extractedData?.expérience || app.extractedData.expérience.length === 0) {
          return false;
        }
        // Iterate through all experience entries and parse each 'durée' to a float
        const maxCandidateExperience = Math.max(
          ...app.extractedData.expérience.map(exp => parseFloat(exp.durée) || 0)
        );
        return maxCandidateExperience >= minYears;
      });
    }

    // Other filters (multi-select Autocomplete) remain the same
    if (diplomaTypeFilter.length > 0) {
      currentFiltered = currentFiltered.filter(app =>
        diplomaTypeFilter.some(filterType =>
          app.extractedData?.formation?.some(edu =>
            edu.type === filterType
          )
        )
      );
    }
    if (addressFilter.length > 0) {
      currentFiltered = currentFiltered.filter(app =>
        addressFilter.some(filterAddr =>
          app.extractedData?.contact?.adresse?.toLowerCase().includes(filterAddr.toLowerCase())
        )
      );
    }
    if (establishmentFilter.length > 0) {
      currentFiltered = currentFiltered.filter(app =>
        establishmentFilter.some(filterEst =>
          app.extractedData?.formation?.some(edu =>
            edu.établissement?.toLowerCase().includes(filterEst.toLowerCase())
          )
        )
      );
    }
    if (specialtyFilter.length > 0) {
      currentFiltered = currentFiltered.filter(app =>
        specialtyFilter.some(filterSpec =>
          app.extractedData?.formation?.some(edu =>
            edu.spécialité?.toLowerCase().includes(filterSpec.toLowerCase())
          )
        )
      );
    }
    if (skillsFilter.length > 0) {
      currentFiltered = currentFiltered.filter(app => {
        const competencies = app.extractedData?.compétences;
        if (!competencies) return false;

        const allAppSkills = Object.values(competencies)
          .flat()
          .filter(Boolean)
          .map(skill => skill.toLowerCase());

        return skillsFilter.some(filterSkill =>
          allAppSkills.includes(filterSkill.toLowerCase())
        );
      });
    }

    setFilteredApplications(limit === 0 ? currentFiltered : currentFiltered.slice(0, limit));

  }, [
    fullApplicationsList,
    limit,
    experienceFilter, // Now a single value
    diplomaTypeFilter,
    addressFilter,
    establishmentFilter,
    specialtyFilter,
    skillsFilter,
  ]);

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  // Handler for text input (Experience)
  const handleExperienceInputChange = (event) => {
    setExperienceFilter(event.target.value);
  };

  // Generic handler for Autocomplete
  const handleAutocompleteChange = (setter) => (event, value) => {
    setter(value);
  };

  const getResume = (resumePath) => {
    if (resumePath && resumePath !== "") {
      const address = `http://localhost:4444${resumePath}`;
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

      <Grid container className={classes.controls} spacing={2}>
        {/* Limit Selector */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            select
            label="Show Candidates"
            value={limit}
            onChange={handleLimitChange}
            variant="outlined"
            size="small"
            className={classes.filterInput}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
            <MenuItem value={0}>Show All</MenuItem>
          </TextField>
        </Grid>

        {/* Experience Filter: Now a simple TextField for number input */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Min. Years of Experience"
            type="number" // Set type to number for appropriate keyboard on mobile and validation
            value={experienceFilter}
            onChange={handleExperienceInputChange}
            variant="outlined"
            size="small"
            className={classes.filterInput}
            InputProps={{ inputProps: { min: 0, step: 0.1 } }} // Allow decimals like 0.1
          />
        </Grid>

        {/* Diploma Type Filter (Autocomplete) - Remains Multi-select */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            multiple
            options={uniqueDiplomaTypes}
            value={diplomaTypeFilter}
            onChange={handleAutocompleteChange(setDiplomaTypeFilter)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Diploma Type"
                placeholder="Select diploma"
                className={classes.filterInput}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
              ))
            }
          />
        </Grid>

        {/* Address Filter (Autocomplete) - Remains Multi-select */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            multiple
            options={uniqueAddresses}
            value={addressFilter}
            onChange={handleAutocompleteChange(setAddressFilter)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Address"
                placeholder="Select address"
                className={classes.filterInput}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
              ))
            }
          />
        </Grid>

        {/* Establishment Filter (Autocomplete) - Remains Multi-select */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            multiple
            options={uniqueEstablishments}
            value={establishmentFilter}
            onChange={handleAutocompleteChange(setEstablishmentFilter)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Establishment"
                placeholder="Select establishment"
                className={classes.filterInput}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
              ))
            }
          />
        </Grid>

        {/* Specialty Filter (Autocomplete) - Remains Multi-select */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            multiple
            options={uniqueSpecialties}
            value={specialtyFilter}
            onChange={handleAutocompleteChange(setSpecialtyFilter)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Specialty"
                placeholder="Select specialty"
                className={classes.filterInput}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
              ))
            }
          />
        </Grid>

        {/* Skills Filter (Autocomplete) - Remains Multi-select */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            multiple
            options={uniqueSkills}
            value={skillsFilter}
            onChange={handleAutocompleteChange(setSkillsFilter)}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills"
                placeholder="Select skills"
                className={classes.filterInput}
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
              ))
            }
          />
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress style={{ margin: "50px" }} />
      ) : filteredApplications.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No matched applications found for this job or no applications match the current filters.
        </Typography>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell className={classes.tableHeaderCell}></TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>CV</TableCell>
                <TableCell className={classes.tableHeaderCell}>Phone Number</TableCell>
                <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                <TableCell className={classes.tableHeaderCell}>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((row) => (
                <TableRow key={row.userId} className={classes.tableRow}>
                  {console.log('row :', row)}
                  <TableCell className={classes.tableCell}>
                    <Avatar
                      src={`http://localhost:4444${row.profile}`}
                      className={classes.avatar}
                    />
                  </TableCell>
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
                  <TableCell className={classes.tableCell}>
                    {row.extractedData?.contact?.telephone || "N/A"}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.extractedData?.contact?.email || "N/A"}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.score || 0} %</TableCell>
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