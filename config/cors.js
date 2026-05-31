const localhostOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:5173",
];

const envOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

const allowedOrigins = [...localhostOrigins, ...envOrigins];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || envOrigins.length === 0) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

export default corsOptions;
