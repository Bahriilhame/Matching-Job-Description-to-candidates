// utils/cvParser.js
const { spawn } = require("child_process");

function parseCVAndExtractData(pdfPath) {
  return new Promise((resolve, reject) => {
    const python = spawn("C:\\Users\\m\\AppData\\Local\\Programs\\Python\\Launcher\\py.exe", ["-3.12", "../../../models/extraction cvs/extract_cv.py"]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${error}`));
      } else {
        try {
          const json = JSON.parse(output);
          resolve(json);
        } catch (err) {
          reject(new Error("Erreur parsing JSON depuis Python : " + err.message));
        }
      }
    });
  });
}

module.exports = parseCVAndExtractData;
