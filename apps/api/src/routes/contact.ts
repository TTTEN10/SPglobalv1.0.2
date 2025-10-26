import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ipHash } from "../lib/crypto";
import { subscriptionRateLimitMiddleware } from "../lib/ratelimit";

const router = Router();

// Apply rate limiting middleware
router.use(subscriptionRateLimitMiddleware);

router.post("/", async (req, res) => {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  const fullName = req.body?.fullName?.toString().trim() || "";
  const subject = req.body?.subject?.toString().trim() || "";
  const message = req.body?.message?.toString().trim() || "";

  // Validate required fields
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, message: "Please provide a valid email address" });

  if (!fullName || fullName.length < 2)
    return res.status(400).json({ success: false, message: "Full name must be at least 2 characters" });

  if (!subject || subject.length < 5)
    return res.status(400).json({ success: false, message: "Subject must be at least 5 characters" });

  if (!message || message.length < 10)
    return res.status(400).json({ success: false, message: "Message must be at least 10 characters" });

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";

  try {
    await prisma.contactMessage.create({
      data: {
        email,
        fullName,
        subject,
        message,
        ipHash: ipHash(ip)
      }
    });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
  } catch (e) {
    console.error('Contact form error:', e);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
});

export default router;

