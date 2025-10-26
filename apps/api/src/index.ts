import express from "express";
import path from "path";
import helmet from "helmet";
import subscribe from "./routes/subscribe";
import contact from "./routes/contact";

const app = express();
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false })); // keep simple; tighten later

app.get("/healthz", (_req, res) => res.send("ok"));
app.get("/readyz", (_req, res) => res.send("ready"));

app.use("/api/subscribe", subscribe);
app.use("/api/contact", contact);

// serve built web app
const dist = path.join(__dirname, "../../web/dist");
app.use(express.static(dist));
app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => console.log(`SafePsy API listening on :${PORT}`));