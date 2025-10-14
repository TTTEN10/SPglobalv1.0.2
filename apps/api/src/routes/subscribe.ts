import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ipHash } from "../lib/crypto";
import { subscriptionRateLimitMiddleware } from "../lib/ratelimit";

const router = Router();

// Apply rate limiting middleware
router.use(subscriptionRateLimitMiddleware);

router.post("/", async (req, res) => {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ ok: false, error: "Invalid email" });

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";

  try {
    await prisma.emailSubscription.upsert({
      where: { email },
      create: { email, ipHash: ipHash(ip) },
      update: {}
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
