const axios = require("axios");
require("dotenv").config();

const api = axios.create({
  baseURL: process.env.FOOTBALL_API_URL,
  headers: { "x-apisports-key": process.env.FOOTBALL_API_KEY }
});

module.exports = {
  getLeagues: async () => {
    const { data } = await api.get("/leagues");
    return data.response;
  },

  getMatchesByDate: async (date) => {
    const { data } = await api.get(`/fixtures?date=${date}`);
    return data.response;
  },

  getMatchDetails: async (id) => {
    const { data } = await api.get(`/fixtures?id=${id}`);
    return data.response[0];
  }
};

