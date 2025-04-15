import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
    <AppBar position="fixed" color="secondary">
            <style>{`
        nav {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }

        nav a {
          color: #fff;
          text-decoration: none;
          margin: 0 1rem;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s ease, transform 0.3s ease;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
        }

        nav a:hover {
          color: #f0f8ff;
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.15);
        }

                  `}</style>
      {/* <Toolbar> */}
        {/* <Typography variant="h4" className={classes.title}  onClick={() => handleClick("/")}> */}
          {/* HireHub */}
          {/* <img src="/logo.png" alt="Logo" width="80" height="70" style={{ cursor: "pointer" }} /> */}
        {/* </Typography> */}
        {/* {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar> */}


<Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
  {/* Logo à gauche */}
  <img
    src="/logo.png"
    alt="Logo"
    width="70"
    height="80"
    style={{ cursor: "pointer" }}
    onClick={() => handleClick("/")}
  />

  {/* Titre au centre (facultatif) */}
  <Typography variant="h4" className={classes.title} style={{ flexGrow: 1 }}>
    
  </Typography>

  {/* Boutons à droite */}
  {isAuth() ? (
    userType() === "recruiter" ? (
      <>
        <Button color="inherit" onClick={() => handleClick("/home")}>Home</Button>
        <Button color="inherit" onClick={() => handleClick("/addjob")}>Add Jobs</Button>
        <Button color="inherit" onClick={() => handleClick("/myjobs")}>My Jobs</Button>
        <Button color="inherit" onClick={() => handleClick("/employees")}>Employees</Button>
        <Button color="inherit" onClick={() => handleClick("/profile")}>Profile</Button>
        <Button color="inherit" onClick={() => handleClick("/logout")}>Logout</Button>
      </>
    ) : (
      <>
        <Button color="inherit" onClick={() => handleClick("/home")}>Home</Button>
        <Button color="inherit" onClick={() => handleClick("/applications")}>Applications</Button>
        <Button color="inherit" onClick={() => handleClick("/profile")}>Profile</Button>
        <Button color="inherit" onClick={() => handleClick("/logout")}>Logout</Button>
      </>
    )
  ) : (
    <>
      {/* <Button color="inherit" onClick={() => handleClick("/login")}>Login</Button>
      <Button color="inherit" onClick={() => handleClick("/signup")}>Signup</Button> */}
      <nav>
          <a href="/#candidats">Candidats</a>
          <a href="/#avantages">Avantages</a>
          <a href="/#contact">Contact</a>
          <a href="/#entreprises">Entreprises</a>
      </nav>
    </>
  )}
</Toolbar>

    </AppBar>
  );
};

export default Navbar;
