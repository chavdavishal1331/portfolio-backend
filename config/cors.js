const allowedOrigins = [
  "https://portfolio-admin-oc7t.onrender.com",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3001",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin || true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
