import express from "express";
import path from "path";
import helmet from "helmet";
import subscribe from "./routes/subscribe";
import contact from "./routes/contact";

const app = express();

// Configure body parser with size limits
app.use(express.json({ limit: '10kb' })); // Limit to 10KB to prevent DoS

// Configure Helmet with CSP for React app
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for React development
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for better compatibility
}));

app.get("/healthz", (_req, res) => res.send("ok"));
app.get("/readyz", (_req, res) => res.send("ready"));

app.use("/api/subscribe", subscribe);
app.use("/api/contact", contact);

// serve built web app
const dist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(dist));
app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));

const PORT = Number(process.env.PORT || 3001);
const server = app.listen(PORT, () => {
  console.log(`SafePsy API listening on :${PORT}`);
  
  // Validate IP_SALT on startup if hashing is enabled
  if (process.env.IP_HASHING_ENABLED === 'true') {
    const salt = process.env.IP_SALT;
    if (!salt || salt.length < 32) {
      console.error('ERROR: IP_SALT must be at least 32 characters for security');
      console.error('Generate a secure salt with: openssl rand -hex 32');
      process.exit(1);
    }
    console.log('IP hashing enabled with secure salt');
  } else {
    console.log('IP hashing disabled (privacy by default)');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});