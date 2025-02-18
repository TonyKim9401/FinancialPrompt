const axios = require("axios");

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_URL = process.env.FMP_URL;

// Link to FMP data
const fetchFMPData = async (apiUrls) => {
  try {
    if (apiUrls.length <= 0) return [];

    const requests = apiUrls.map((url) => {
      // Example url :
      // https://site.financialmodelingprep.com/api/v3/earning_call_transcript/AIRBNB?apikey=YOUR_API_KEY

      url += `?apikey=${FMP_API_KEY}`;

      console.log(url);

      return axios.get(url);
    });

    const responses = await Promise.allSettled(requests);

    return responses.map((res, idx) => ({
      url: apiUrls[idx],
      status: res.status === "fulfilled" ? res.value.status : "rejected",
      data: res.status === "fulfilled" ? res.value.data : null,
      error: res.status === "rejected" ? res.reason.message : null,
    }));
  } catch (error) {
    console.error("Error Fetching FMP Data:", error);
    return [];
  }
};

module.exports = { fetchFMPData };
