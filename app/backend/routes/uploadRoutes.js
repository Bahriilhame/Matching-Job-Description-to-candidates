// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");

// const pipeline = promisify(require("stream").pipeline);

// const router = express.Router();

// const upload = multer();

// router.post("/resume", upload.single("file"), (req, res) => {
//   const { file } = req;
//   // if (file.detectedFileExtension != ".pdf") {
//   //   res.status(400).json({
//   //     message: "Invalid format",
//   //   });
//   // Vérifie si un fichier a été envoyé
//   console.log('====================================');
//   console.log(file.originalname.endsWith(".pdf"));
//   console.log('====================================');
//   if (!file || !file.originalname.endsWith(".pdf")) {
//     return res.status(400).json({ message: "Invalid format" });
//   } else {

//     const path = require("path"); // Assure-toi d'importer path
//     const filename = `${uuidv4()}${path.extname(file.originalname)}`;

//     // const filename = `${uuidv4()}${file.detectedFileExtension}`;

//     console.log('====================================');
//     console.log(filename);
//     console.log('====================================');

//     // pipeline(
//     //   file.stream,
//     //   fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
//     // )

//     pipeline(
//       file.buffer,
//       fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
//     )
    
//       .then(() => {
//         res.send({
//           message: "File uploaded successfully",
//           url: `/host/resume/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });


const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path"); 
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Configuration de multer pour stocker le fichier en mémoire
const upload = multer({ storage: multer.memoryStorage() });

// Vérifie et crée le dossier si nécessaire
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;

    if (!file || !file.originalname.endsWith(".pdf")) {
      return res.status(400).json({ message: "Invalid format" });
    }

    // Générer un nom de fichier unique
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    const uploadPath = path.join(__dirname, "../public/resume");

    // Vérifie et crée le dossier si nécessaire
    ensureDirExists(uploadPath);

    // Écriture du fichier
    fs.writeFileSync(path.join(uploadPath, filename), file.buffer);

    res.status(200).json({
      message: "File uploaded successfully",
      url: `/host/resume/${filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error while uploading" });
  }
});

// 
// 


// 
// 

// router.post("/profile", upload.single("file"), (req, res) => {
//   const { file } = req;
//   if (
//     file.detectedFileExtension != ".jpg" &&
//     file.detectedFileExtension != ".png"
//   ) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.detectedFileExtension}`;

//     pipeline(
//       file.stream,
//       fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "Profile image uploaded successfully",
//           url: `/host/profile/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });




router.post("/profile", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Vérifie si l'extension est correcte
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: "Invalid format" });
    }

    // Générer un nom de fichier unique
    const filename = `${uuidv4()}${fileExtension}`;
    const uploadPath = path.join(__dirname, "../public/profile");

    // Vérifie et crée le dossier si nécessaire
    ensureDirExists(uploadPath);

    // Écriture du fichier
    fs.writeFileSync(path.join(uploadPath, filename), file.buffer);

    res.status(200).json({
      message: "Profile image uploaded successfully",
      url: `/host/profile/${filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error while uploading" });
  }
});


module.exports = router;

