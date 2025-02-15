const express = require("express");
const {
  getFinancialData,
  getIncomeStatement,
  getCompanyProfile,
  getStockNews,
} = require("../controllers/financialControllers.js");

const router = express.Router();

router.get("/stock-news", getStockNews); // Get Stock News
router.get("/company-profile", getCompanyProfile); // Get CompanyProfile
router.get("/financial-data", getFinancialData); // Get FMP API data
router.get("/income-statement", getIncomeStatement); // Call income statement

module.exports = router;
