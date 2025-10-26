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
    return res.status(400).json({ success: false, message: "Invalid email" });

  // Optional fields from JoinOurWaitlist form
  const fullName = req.body?.fullName?.toString().trim() || null;
  const role = req.body?.role?.toString().trim() || null;
  const consentGiven = req.body?.consentGiven === true || false;
  const consentTimestamp = consentGiven ? new Date() : null;

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";

  try {
    const subscription = await prisma.emailSubscription.upsert({
      where: { email },
      create: { 
        email, 
        fullName,
        role,
        ipHash: ipHash(ip),
        consentGiven,
        consentTimestamp
      },
      update: {}
    });
    
    // Return success message matching the expected format
    res.json({ 
      success: true, 
      message: 'Thanks! We\'ll email you product updates.' 
    });
  } catch (e) {
    console.error('Subscription error:', e);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

export default router;
