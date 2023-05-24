require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
};
