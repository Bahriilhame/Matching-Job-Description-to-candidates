import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh", // Full height of the viewport
    width: "100vw", // Full width of the viewport
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#f0f4f8", // Light background color for the page
    margin: 0, // Remove any default margin
    padding: 0, // Remove any default padding
    boxSizing: "border-box",
  },
  tableContainer: {
    width: "90%",
    height: "80%", // Adjust height to fit within the viewport
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
    overflow: "auto", // Scrollable if content overflows
    backgroundColor: "#ffffff", // Ensure table container has a white background
  },
  tableHeader: {
    backgroundColor: "#004aad",
    zIndex:999 // Set header background color to #004aad
  },
  tableHeaderCell: {
    backgroundColor: "#004aad", // White text for contrast
    color: "#ffffff", // White text for contrast
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
    color: "#004aad", // Title color matching the header
    fontWeight: "bold",
  },
}));

const MatchedApplications = () => {
  const classes = useStyles();

  const testData = [
    { name: "John Doe", cv: "CV Link", telephone: "+212612345678", score: 85 },
    { name: "Jane Smith", cv: "CV Link", telephone: "+212612345678", score: 90 },
    { name: "Alice Johnson", cv: "CV Link", telephone: "+212612345678", score: 75 },
  ];

  return (
    <div className={classes.root}>
              <Grid 
                container
                item
                direction="column"
                alignItems="center"
                style={{ padding: "30px"}}
              >
                <Typography variant="h2">Matched Applications</Typography>
              </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>CV</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Num de Telephone
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testData.map((row, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                <TableCell className={classes.tableCell}>
                  <Link href="#" color="primary" underline="always">
                    {row.cv}
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>{row.telephone}</TableCell>
                <TableCell className={classes.tableCell}>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MatchedApplications;