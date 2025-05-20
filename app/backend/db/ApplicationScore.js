const mongoose = require("mongoose");

const matchedApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplicantInfo",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isFinite,
        msg: "Score must be a valid number between 0 and 100",
      },
    },
    matchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collation: { locale: "en" }, timestamps: true }
);

module.exports = mongoose.model("ApplicationScore", matchedApplicationSchema);
