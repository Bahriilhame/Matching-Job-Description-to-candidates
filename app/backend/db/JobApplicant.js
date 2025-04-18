const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    education: [
      {
        institutionName: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          min: 1930,
          max: new Date().getFullYear(),
          required: true,
          validate: Number.isInteger,
        },
        endYear: {
          type: Number,
          max: new Date().getFullYear(),
          validate: [
            { validator: Number.isInteger, msg: "Year should be an integer" },
            {
              validator: function (value) {
                return this.startYear <= value;
              },
              msg: "End year should be greater than or equal to Start year",
            },
          ],
        },
      },
    ],
    skills: [String],
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
    resume: {
      type: String,
    },
    profile: {
      type: String,
    },



    extractedData: {
      nom: String,
      contact: {
        telephone: String,
        email: String,
        adresse: String,
        social: [String],
      },
      expérience: [
        {
          poste: String,
          lieu: String,
          durée: String,
          entreprise: String,
          tâches: [String],
        },
      ],
      formation: [
        {
          type: String,
          spécialité: String,
          durée: String,
          établissement: String,
        },
      ],
      compétences: {
        outils: [String],
        technologies: [String],
        autres: [String],
      },
      langues: [
        {
          langue: String,
          niveau: String,
        },
      ],
      projets: [
        {
          nom: String,
          description: String,
          technologies: [String],
          outils: [String],
          lien: String,
        },
      ],
    },




    
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("JobApplicantInfo", schema);