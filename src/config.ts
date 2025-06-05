const env = import.meta.env


const config = {
  apiBasePath: env.VITE_API_BASE_PATH,
  botID: env.VITE_BOT_ID
};


export default config;
