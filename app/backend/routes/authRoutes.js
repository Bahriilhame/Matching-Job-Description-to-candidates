// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const authKeys = require("../lib/authKeys");

// const User = require("../db/User");
// const JobApplicant = require("../db/JobApplicant");
// const Recruiter = require("../db/Recruiter");

// const router = express.Router();

// // 
// const parseCVAndExtractData = require("../services/cvParser");
// const path = require("path");


// router.post("/signup", async (req, res) => {
//   const data = req.body;

//   const user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   try {
//     await user.save();

//     let jobApplicantData = {
//       userId: user._id,
//       name: data.name,
//       education: data.education,
//       skills: data.skills,
//       rating: data.rating,
//       resume: data.resume,
//       profile: data.profile,
//     };

//     // Extraire les données si type == applicant
//     if (user.type === "applicant") {
//       const resumePath = path.join(__dirname, "../public/resume/", data.resume);
//       try {
//         const extracted = await parseCVAndExtractData(resumePath);

//         // Overwrite les champs s'ils existent
//         jobApplicantData.name = extracted.name || jobApplicantData.name;
//         jobApplicantData.education = extracted.education || [];
//         jobApplicantData.skills = extracted.skills || [];
//         jobApplicantData.profile = extracted.profile || "";

//       } catch (extractionErr) {
//         console.error("Erreur extraction CV :", extractionErr.message);
//       }
//     }

//     const userDetails = user.type === "recruiter"
//       ? new Recruiter({
//           userId: user._id,
//           name: data.name,
//           contactNumber: data.contactNumber,
//           bio: data.bio,
//         })
//       : new JobApplicant(jobApplicantData);

//     await userDetails.save();

//     const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//     res.json({ token, type: user.type });

//   } catch (err) {
//     await User.deleteOne({ _id: user._id }).catch(() => {});
//     res.status(400).json({ error: err });
//   }
// });
// // 

// // router.post("/signup", (req, res) => {
// //   const data = req.body;
// //   let user = new User({
// //     email: data.email,
// //     password: data.password,
// //     type: data.type,
// //   });

// //   user
// //     .save()
// //     .then(() => {
// //       const userDetails =
// //         user.type == "recruiter"
// //           ? new Recruiter({
// //               userId: user._id,
// //               name: data.name,
// //               contactNumber: data.contactNumber,
// //               bio: data.bio,
// //             })
// //           : new JobApplicant({
// //               userId: user._id,
// //               name: data.name,
// //               education: data.education,
// //               skills: data.skills,
// //               rating: data.rating,
// //               resume: data.resume,
// //               profile: data.profile,
// //             });

// //       userDetails
// //         .save()
// //         .then(() => {
// //           // Token
// //           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
// //           res.json({
// //             token: token,
// //             type: user.type,
// //           });
// //         })
// //         .catch((err) => {
// //           user
// //             .delete()
// //             .then(() => {
// //               res.status(400).json(err);
// //             })
// //             .catch((err) => {
// //               res.json({ error: err });
// //             });
// //           err;
// //         });
// //     })
// //     .catch((err) => {
// //       res.status(400).json(err);
// //     });
// // });

// router.post("/login", (req, res, next) => {
//   passport.authenticate(
//     "local",
//     { session: false },
//     function (err, user, info) {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         res.status(401).json(info);
//         return;
//       }
//       // Token
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({
//         token: token,
//         type: user.type,
//       });
//     }
//   )(req, res, next);
// });

// module.exports = router;





const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs').promises; // For reading local files
const path = require('path');
const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");

const router = express.Router();

// Retourne exctracted vide
// router.post("/signup", async (req, res) => {
//   const data = req.body;
//   let user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   try {
//     await user.save();

//     let userDetails;
//     if (user.type == "recruiter") {
//       userDetails = new Recruiter({
//         userId: user._id,
//         name: data.name,
//         contactNumber: data.contactNumber,
//         bio: data.bio,
//       });
//       await userDetails.save();
//       // Token for recruiter
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       return res.json({
//         token: token,
//         type: user.type,
//       });
//     } else {
//       userDetails = new JobApplicant({
//         userId: user._id,
//         name: data.name,
//         education: data.education,
//         skills: data.skills,
//         rating: data.rating,
//         resume: data.resume,
//         profile: data.profile,
//       });
//       await userDetails.save();

//       // Call the extraction API if a resume file URL is provided
//       if (data.resume) {
//         try {
//           const formData = new FormData();
//           // Assuming 'data.resume' is a URL to the PDF file
//           const response = await axios.get(data.resume, { responseType: 'blob' });
//           const file = new File([response.data], 'resume.pdf'); // Create a File object

//           formData.append("file", file);

//           const extractionResponse = await axios.post(
//             "http://127.0.0.1:8000/extract-cv/", // Replace with the actual URL of your FastAPI API
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );

//           const extractedData = extractionResponse.data.data;

//           // Store the extracted data in the JobApplicantInfo model
//           const jobApplicantInfo = new JobApplicantInfo({
//             userId: user._id,
//             ...userDetails.toObject(), // Copy existing applicant details
//             extractedData: extractedData,
//           });
//           await jobApplicantInfo.save();

//           // Token for job applicant
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             type: user.type,
//             extractedData: extractedData, // Optionally return the extracted data
//           });
//         } catch (error) {
//           console.error("Error calling extraction API:", error);
//           // Optionally handle the error, e.g., log it and still return a signup success
//           // without the extracted data, or return an error to the client.
//           // For now, we'll just log the error and proceed with signup.
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             type: user.type,
//             message: "Signup successful, but CV extraction failed.",
//           });
//         }
//       } else {
//         // Token for job applicant (no resume provided)
//         const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//         res.json({
//           token: token,
//           type: user.type,
//         });
//       }
//     }
//   } catch (err) {
//     console.error("Error during signup:", err);
//     if (user._id) {
//       try {
//         await User.findByIdAndDelete(user._id);
//       } catch (deleteErr) {
//         console.error("Error deleting user after signup failure:", deleteErr);
//         return res.status(500).json({ error: "Signup failed and failed to rollback user creation." });
//       }
//     }
//     res.status(400).json(err);
//   }
// });




// 


// 2nd essai

const multer = require('multer');

// const upload = multer(); // For handling multipart/form-data


// working 

// router.post("/signup", upload.single('resume'), async (req, res) => {
//   const data = req.body;
//   const resumeFile = req.file; // Check if a file was uploaded

//   let user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//   });

//   try {
//     await user.save();

//     let userDetails;
//     if (user.type == "recruiter") {
//       userDetails = new Recruiter({
//         userId: user._id,
//         name: data.name,
//         contactNumber: data.contactNumber,
//         bio: data.bio,
//       });
//       await userDetails.save();
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       return res.json({ token: token, type: user.type });
//     } else {
//       userDetails = new JobApplicant({
//         userId: user._id,
//         name: data.name,
//         education: data.education,
//         skills: data.skills,
//         rating: data.rating,
//         resume: req.file ? `/host/resume/${req.file.filename}` : data.resume, // Store path if uploaded, URL if provided
//         profile: data.profile,
//       });

//       let extractedData = {};

//       if (resumeFile) { // Handle direct file upload
//         try {
//           console.log("Resume file received:", resumeFile.originalname);
//           const formDataForFastAPI = new FormData();
//           formDataForFastAPI.append('file', resumeFile.buffer, resumeFile.originalname);

//           const extractionResponse = await axios.post(
//             "http://127.0.0.1:8000/extract-cv/",
//             formDataForFastAPI,
//             { headers: { ...formDataForFastAPI.getHeaders() } }
//           );
//           console.log("Extraction API Response (file upload):", extractionResponse.data);
//           extractedData = extractionResponse.data.data;
//         } catch (error) {
//           console.error("Error calling extraction API (file upload):", error);
//           res.json({ token: jwt.sign({ _id: user._id }, authKeys.jwtSecretKey), type: "applicant", message: "Signup successful, but CV extraction failed (file upload)." });
//           return;
//         }
//       } else if (data.resume) {
//         if (data.resume.startsWith("http") || data.resume.startsWith("https")) {
//           // Handle resume URL
//           try {
//             console.log("Fetching resume from URL:", data.resume);
//             const response = await axios.get(data.resume, { responseType: 'arraybuffer' });
//             const formDataForFastAPI = new FormData();
//             formDataForFastAPI.append('file', Buffer.from(response.data, 'binary'), 'resume_from_url.pdf'); // Provide a generic filename

//             const extractionResponse = await axios.post(
//               "http://127.0.0.1:8000/extract-cv/",
//               formDataForFastAPI,
//               { headers: { ...formDataForFastAPI.getHeaders() } }
//             );
//             console.log("Extraction API Response (URL):", extractionResponse.data);
//             extractedData = extractionResponse.data.data;
//           } catch (error) {
//             console.error("Error calling extraction API (URL):", error);
//             res.json({ token: jwt.sign({ _id: user._id }, authKeys.jwtSecretKey), type: "applicant", message: "Signup successful, but CV extraction failed (URL)." });
//             return;
//           }
//         } else if (data.resume.startsWith('/host/resume/')) {
//           // Handle locally stored file path (after upload)
//           try {
//             // const resumeFilePath = path.join(__dirname, 'public', 'resume', path.basename(data.resume));
//             const resumeFilePath = path.join(__dirname, '..', 'public', 'resume', path.basename(data.resume));
//             console.log("Attempting to read local resume from:", resumeFilePath);
//             const fileBuffer = await fs.readFile(resumeFilePath);
//             const formDataForFastAPI = new FormData();
//             formDataForFastAPI.append('file', fileBuffer, path.basename(data.resume));

//             const extractionResponse = await axios.post(
//               "http://127.0.0.1:8000/extract-cv/",
//               formDataForFastAPI,
//               { headers: { ...formDataForFastAPI.getHeaders() } }
//             );
//             console.log("Extraction API Response (file upload):", extractionResponse.data);
  
//             let extractedData = {};
//             if (typeof extractionResponse.data === 'string' && extractionResponse.data.startsWith('```json')) {
//               const jsonString = extractionResponse.data.substring(7, extractionResponse.data.length - 3).trim(); // Remove ```json and ```
//               try {
//                 extractedData = JSON.parse(jsonString);
//               } catch (parseError) {
//                 console.error("Error parsing final JSON string:", parseError);
//                 extractedData = {}; // Handle parsing error
//               }
//             } else {
//               extractedData = extractionResponse.data; // If it's already a parsed object (shouldn't be the case now)
//             }



//           } catch (error) {
//             console.error("Error processing local resume file:", error);
//             res.json({ token: jwt.sign({ _id: user._id }, authKeys.jwtSecretKey), type: "applicant", message: "Signup successful, but error processing local resume file." });
//             return;
//           }
//         } else {
//           console.log("No resume file or valid URL provided.");
//           userDetails.resume = null; // Or handle as needed
//         }
//       } else {
//         userDetails.resume = null; // No resume provided
//       }

//       const updatedUserDetails = { ...userDetails.toObject(), extractedData };
//       const savedJobApplicant = new JobApplicant(updatedUserDetails);
//       await savedJobApplicant.save();

//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({ token: token, type: user.type, extractedData: extractedData });
//     }
//   } catch (err) {
//     console.error("Error during signup:", err);
//     if (user._id) {
//       try {
//         await User.findByIdAndDelete(user._id);
//       } catch (deleteErr) {
//         console.error("Error deleting user after signup failure:", deleteErr);
//         return res.status(500).json({ error: "Signup failed and failed to rollback user creation." });
//       }
//     }
//     res.status(400).json(err);
//   }
// });














// essay
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "resume"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.post("/signup", upload.single('resume'), async (req, res) => {
  const data = req.body;
  const resumeFile = req.file;

  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  try {
    await user.save();

    let userDetails;
    if (user.type == "recruiter") {
      userDetails = new Recruiter({
        userId: user._id,
        name: data.name,
        contactNumber: data.contactNumber,
        bio: data.bio,
      });
      await userDetails.save();
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      return res.json({ token: token, type: user.type });
    } else {
      let extractedData = {};
      let resumePath = null;

      // Handle resume extraction
      if (resumeFile) {
        resumePath = `/host/resume/${resumeFile.filename}`;
        try {
          const formDataForFastAPI = new FormData();
          formDataForFastAPI.append('file', resumeFile.buffer, resumeFile.originalname);

          const extractionResponse = await axios.post(
            "http://127.0.0.1:8000/extract-cv/",
            formDataForFastAPI,
            { headers: { ...formDataForFastAPI.getHeaders() } }
          );

          if (extractionResponse.data && extractionResponse.data.data) {
            extractedData = extractionResponse.data.data;
            console.log("Successfully extracted CV data:", extractedData);
          } else {
            console.log("CV extraction returned empty data");
          }
        } catch (error) {
          console.error("CV extraction error:", error.message);
          // Continue with signup even if extraction fails
        }
      } else if (data.resume) {
        resumePath = data.resume;

        try {
          let fileBuffer;
          if (data.resume.startsWith("http") || data.resume.startsWith("https")) {
            // Handle URL
            const response = await axios.get(data.resume, { responseType: 'arraybuffer' });
            fileBuffer = Buffer.from(response.data, 'binary');
          } else if (data.resume.startsWith('/host/resume/')) {
            // Handle local file
            const resumeFilePath = path.join(__dirname, '..', 'public', 'resume', path.basename(data.resume));
            fileBuffer = await fs.readFile(resumeFilePath);
          }

          if (fileBuffer) {
            const formDataForFastAPI = new FormData();
            formDataForFastAPI.append('file', fileBuffer, 'resume.pdf');

            const extractionResponse = await axios.post(
              "http://127.0.0.1:8000/extract-cv/",
              formDataForFastAPI,
              { headers: { ...formDataForFastAPI.getHeaders() } }
            );

            if (extractionResponse.data && extractionResponse.data.data) {
              extractedData = extractionResponse.data.data;
              console.log("Successfully extracted CV data from URL/local path:", extractedData);
            }
          }
        } catch (error) {
          console.error("Resume processing error:", error.message);
        }
      }

      // Create user details with extracted data
      userDetails = new JobApplicant({
        userId: user._id,
        name: data.name,
        education: data.education || [],
        skills: data.skills || extractedData.compétences?.autres || [],
        rating: data.rating || -1,
        resume: resumePath,
        profile: data.profile,
        extractedData: {
          nom: extractedData.nom,
          contact: extractedData.contact,
          expérience: extractedData.expérience,
          formation: extractedData.formation,
          compétences: extractedData.compétences,
          langues: extractedData.langues,
          projets: extractedData.projets,
        }
      });

      try {
        await userDetails.save();

        const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
        return res.json({
          token: token,
          type: user.type,
          extractedData: extractedData
        });
      } catch (validationError) {
        console.error("Error saving JobApplicantInfo:", validationError);
        if (user._id) {
          try {
            await User.findByIdAndDelete(user._id);
          } catch (deleteErr) {
            console.error("Rollback error:", deleteErr);
          }
        }
        res.status(400).json({
          error: "Signup failed",
          message: validationError.message
        });
      }
    }
  } catch (err) {
    console.error("Signup error:", err);
    if (user._id) {
      try {
        await User.findByIdAndDelete(user._id);
      } catch (deleteErr) {
        console.error("Rollback error:", deleteErr);
      }
    }
    res.status(400).json({
      error: "Signup failed",
      message: err.message
    });
  }
});





// 




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