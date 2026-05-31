const allowedOrigins = [
  "https://portfolio-admin-oc7t.onrender.com",
  "https://portfolio-frontend-oc7t.onrender.com",
  "https://portfolio-backend-ro4m.onrender.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

const renderPortfolioOrigin =
  /^https:\/\/portfolio-(admin|frontend|backend)-[a-z0-9]+\.onrender\.com$/i;

const corsOptions = {
  origin(origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      renderPortfolioOrigin.test(origin)
    ) {
      callback(null, origin || true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  maxAge: 86400,
  exposedHeaders: ["Content-Type"],
};

export default corsOptions;
