require("dotenv").config();

module.exports = {
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  port: process.env.PORT || 3000,
};
