const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");

const router = express.Router();

// 
const parseCVAndExtractData = require("../services/cvParser");
const path = require("path");


router.post("/signup", async (req, res) => {
  const data = req.body;

  const user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  try {
    await user.save();

    let jobApplicantData = {
      userId: user._id,
      name: data.name,
      education: data.education,
      skills: data.skills,
      rating: data.rating,
      resume: data.resume,
      profile: data.profile,
    };

    // Extraire les données si type == applicant
    if (user.type === "applicant") {
      const resumePath = path.join(__dirname, "../public/resume/", data.resume);
      try {
        const extracted = await parseCVAndExtractData(resumePath);

        // Overwrite les champs s'ils existent
        jobApplicantData.name = extracted.name || jobApplicantData.name;
        jobApplicantData.education = extracted.education || [];
        jobApplicantData.skills = extracted.skills || [];
        jobApplicantData.profile = extracted.profile || "";

      } catch (extractionErr) {
        console.error("Erreur extraction CV :", extractionErr.message);
      }
    }

    const userDetails = user.type === "recruiter"
      ? new Recruiter({
          userId: user._id,
          name: data.name,
          contactNumber: data.contactNumber,
          bio: data.bio,
        })
      : new JobApplicant(jobApplicantData);

    await userDetails.save();

    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    res.json({ token, type: user.type });

  } catch (err) {
    await User.deleteOne({ _id: user._id }).catch(() => {});
    res.status(400).json({ error: err });
  }
});
// 

// router.post("/signup", (req, res) => {
//   const data = req.body;
//   let user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   user
//     .save()
//     .then(() => {
//       const userDetails =
//         user.type == "recruiter"
//           ? new Recruiter({
//               userId: user._id,
//               name: data.name,
//               contactNumber: data.contactNumber,
//               bio: data.bio,
//             })
//           : new JobApplicant({
//               userId: user._id,
//               name: data.name,
//               education: data.education,
//               skills: data.skills,
//               rating: data.rating,
//               resume: data.resume,
//               profile: data.profile,
//             });

//       userDetails
//         .save()
//         .then(() => {
//           // Token
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             type: user.type,
//           });
//         })
//         .catch((err) => {
//           user
//             .delete()
//             .then(() => {
//               res.status(400).json(err);
//             })
//             .catch((err) => {
//               res.json({ error: err });
//             });
//           err;
//         });
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router;
