const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    agent: {
      type: String,
    },
    userType: {
      type: String,
    },
    policy_mode: {
      type: String,
    },
    producer: {
      type: String,
    },
    policy_number: {
      type: String,
    },
    premium_amount_written: {
      type: String,
    },
    premium_amount: {
      type: String,
    },
    policy_type: {
      type: String,
    },
    company_name: {
      type: String,
    },
    category_name: {
      type: String,
    },
    policy_start_date: {
      type: String,
    },
    policy_end_date: {
      type: String,
    },
    csr: {
      type: String,
    },
    account_name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    firstname: {
      type: String,
    },
    city: {
      type: String,
    },
    account_type: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    dob: {
      type: String,
    },
    primary: {
      type: String,
    },
    ApplicantID: {
      type: String,
    },
    agency_id: {
      type: String,
    },
    hasActiveClientPolicy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Data", DataSchema);
