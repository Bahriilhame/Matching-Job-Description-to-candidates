import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  AddCircleOutline,
  DeleteOutline,
  Description,
  Edit,
  Face,
  School,
  Work,
  CheckCircle,
  Cancel,
  FormatAlignCenter
} from "@material-ui/icons";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";
import { server } from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
    width: "95%",
    maxWidth: "1600px",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      width: "100%"
    }
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    fontSize: "2.5rem"
  },
  profileCard: {
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)"
    },
    width: "100%"
  },
  profileAvatar: {
    width: 150,
    height: 150,
    margin: "0 auto",
    border: `4px solid ${theme.palette.primary.main}`
  },
  sectionHeader: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    "& svg": {
      marginRight: theme.spacing(2),
      fontSize: "1.8rem"
    }
  },
  skillChip: {
    margin: theme.spacing(1),
    borderRadius: 8,
    fontSize: "1rem",
    padding: theme.spacing(1),
    height: "auto"
  },
  educationItem: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper
  },
  editButton: {
    marginLeft: "auto",
    padding: theme.spacing(1.5, 3),
    fontSize: "1rem"
  },
  formContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.action.hover,
    borderRadius: 12,
    marginBottom: theme.spacing(3)
  },
  wideField: {
    marginBottom: theme.spacing(3),
    "& .MuiInputBase-root": {
      fontSize: "1.1rem"
    }
  },
  buttonGroup: {
    marginTop: theme.spacing(4),
    "& button": {
      padding: theme.spacing(1.5, 4),
      fontSize: "1rem"
    }
  }
}));

const EducationItem = ({ edu, index, onEdit, onDelete, classes }) => {
  return (
    <Paper elevation={0} className={classes.educationItem}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            {edu.institutionName || "Non spécifié"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {edu.startYear} - {edu.endYear || "Présent"}
          </Typography>
        </div>
        <Box display="flex" gridGap={16}>
          <IconButton size="medium" onClick={() => onEdit(index)}>
            <Edit fontSize="large" />
          </IconButton>
          <IconButton size="medium" onClick={() => onDelete(index)}>
            <DeleteOutline fontSize="large" color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

const EducationForm = ({ education, setEducation, onCancel, classes }) => {
  const handleChange = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  const addNewEducation = () => {
    setEducation([
      ...education,
      {
        institutionName: "",
        startYear: "",
        endYear: ""
      }
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom>
        Formation
      </Typography>
      {education.map((edu, index) => (
        <Box key={index} className={classes.formContainer}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Établissement"
                value={edu.institutionName}
                onChange={(e) => handleChange(index, "institutionName", e.target.value)}
                variant="outlined"
                size="medium"
                className={classes.wideField}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Année de début"
                type="number"
                value={edu.startYear}
                onChange={(e) => handleChange(index, "startYear", e.target.value)}
                variant="outlined"
                size="medium"
                className={classes.wideField}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <TextField
                fullWidth
                label="Année de fin"
                type="number"
                value={edu.endYear}
                onChange={(e) => handleChange(index, "endYear", e.target.value)}
                variant="outlined"
                size="medium"
                className={classes.wideField}
                inputProps={{ min: 1900, max: new Date().getFullYear() + 10 }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeEducation(index)} size="medium" color="secondary">
                <DeleteOutline fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Box display="flex" gridGap={16} mt={2}>
        <Button
          startIcon={<AddCircleOutline />}
          onClick={addNewEducation}
          variant="outlined"
          size="large"
          style={{ padding: '12px 24px' }}
        >
          Ajouter une formation
        </Button>
        <Button 
          onClick={onCancel} 
          variant="text" 
          color="secondary"
          size="large"
          style={{ padding: '12px 24px' }}
        >
          Annuler
        </Button>
      </Box>
    </Box>
  );
};

const Profile = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: ""
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: ""
    }
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value
    });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("Profile data:", response.data); 

      setProfileDetails(response.data);
      if (response.data.education?.length > 0) {
        setEducation(
          response.data.education.map((edu) => ({
            institutionName: edu.institutionName || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || ""
          }))
        );
      }
    } catch (err) {
      console.error(err);
      setPopup({
        open: true,
        severity: "error",
        message: "Erreur lors du chargement du profil"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const updatedDetails = {
        ...profileDetails,
        education: education
          .filter((obj) => obj.institutionName.trim() !== "")
          .map((obj) => {
            if (obj["endYear"] === "") {
              delete obj["endYear"];
            }
            return obj;
          })
      };

      await axios.put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setPopup({
        open: true,
        severity: "success",
        message: "Profil mis à jour avec succès"
      });
      setIsEditing(false);
      fetchProfileData();
    } catch (err) {
      console.error(err);
      setPopup({
        open: true,
        severity: "error",
        message: err.response?.data?.message || "Erreur lors de la mise à jour"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box width="100%" p={4}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Mon Profil
      </Typography>

      <Card className={classes.profileCard}>
        <CardContent>
          {isEditing ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <FileUploadInput
                    label="Photo de profil"
                    icon={<Face />}
                    uploadTo={apiList.uploadProfileImage}
                    handleInput={handleInput}
                    identifier={"profile"}
                    preview={profileDetails.profile ? `${server}${profileDetails.profile}` : null}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  value={profileDetails.name}
                  onChange={(e) => handleInput("name", e.target.value)}
                  variant="outlined"
                  size="medium"
                  className={classes.wideField}
                />

                <EducationForm
                  education={education}
                  setEducation={setEducation}
                  onCancel={() => setIsEditing(false)}
                  classes={classes}
                />

                <Box mt={4}>
                  <Typography variant="h4" gutterBottom>
                    Compétences
                  </Typography>
                  <ChipInput
                    fullWidth
                    label="Ajoutez vos compétences"
                    variant="outlined"
                    size="medium"
                    newChipKeyCodes={[13, 188]}
                    value={profileDetails.skills}
                    onAdd={(chip) =>
                      setProfileDetails({
                        ...profileDetails,
                        skills: [...profileDetails.skills, chip]
                      })
                    }
                    onDelete={(chip, index) => {
                      const skills = [...profileDetails.skills];
                      skills.splice(index, 1);
                      setProfileDetails({
                        ...profileDetails,
                        skills
                      });
                    }}
                    InputProps={{
                      className: classes.wideField
                    }}
                  />
                </Box>

                <Box mt={2}>
                  <Typography variant="h4" gutterBottom>
                    Documents
                  </Typography>
                  <FileUploadInput
                    label="CV (PDF)"
                    icon={<Description />}
                    uploadTo={apiList.uploadResume}
                    handleInput={handleInput}
                    identifier={"resume"}
                    preview={profileDetails.resume}
                  />
                </Box>

                <Box display="flex" gridGap={24} className={classes.buttonGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                    startIcon={<CheckCircle />}
                    size="large"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setIsEditing(false)}
                    startIcon={<Cancel />}
                    size="large"
                  >
                    Annuler
                  </Button>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={profileDetails.profile ? `${server}${profileDetails.profile}` : "/default-avatar.png"}
                    alt="Photo de profil"
                    className={classes.profileAvatar}
                  />

                  <Typography variant="h4" style={{ marginTop: 24, fontWeight: 600 }}>
                    {profileDetails.name || "Non spécifié"}
                  </Typography>
                </Box>

                <Box mt={6}>
                  <Typography variant="h4" className={classes.sectionHeader}>
                    <Work fontSize="inherit" /> Compétences
                  </Typography>
                  <Box display="flex" flexWrap="wrap">
                    {profileDetails.skills?.length > 0 ? (
                      profileDetails.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="primary"
                          className={classes.skillChip}
                        />
                      ))
                    ) : (
                      <Typography variant="body1" color="textSecondary">
                        Aucune compétence ajoutée
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box mt={6}>
                  <Typography variant="h4" className={classes.sectionHeader}>
                    <Description fontSize="inherit" /> Documents
                  </Typography>
                  {profileDetails.resume ? (
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<Description />}
                        href={`${server}${profileDetails.resume}`}
                        target="_blank"
                        fullWidth
                        size="large"
                        style={{ padding: '12px', marginBottom: '16px' }}
                      >
                        Voir mon CV
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      Aucun CV téléchargé
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    className={classes.editButton}
                    size="large"
                  >
                    Modifier le profil
                  </Button>
                </Box>

                <Box mt={6}>
                  <Typography variant="h4" className={classes.sectionHeader}>
                    <School fontSize="inherit" /> Formation
                  </Typography>
                  {profileDetails.education?.length > 0 ? (
                    profileDetails.education.map((edu, index) => (
                      <EducationItem
                        key={index}
                        edu={edu}
                        index={index}
                        onEdit={() => setIsEditing(true)}
                        onDelete={() => setIsEditing(true)}
                        classes={classes}
                      />
                    ))
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      Aucune formation ajoutée
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;