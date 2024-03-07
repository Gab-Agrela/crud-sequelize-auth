import "dotenv/config";

const { POSTGRES_URL } = process.env;

const config = POSTGRES_URL;

export default config;
