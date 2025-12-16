import { Router } from "express";
import jwt from "jsonwebtoken";
import { createUser, verifyUser } from "./service";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const user = await createUser(email, password, firstName, lastName);
    res.status(201).json(user);
  } catch (err: any) {
    if (err.message === "UserExists") return res.status(409).json({ error: "User already exists" });
    res.status(500).json({ error: "internal" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const user = await verifyUser(email, password);
    if (!user) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "internal" });
  }
});

export default router;
