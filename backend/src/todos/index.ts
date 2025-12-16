import { Router } from "express";

const router = Router();

type Todo = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
};

const todos: Todo[] = [];

router.post("/", (req, res) => {
  const { userId, title, description } = req.body;
  if (!userId || !title) return res.status(400).json({ error: "userId and title required" });
  const todo: Todo = { id: String(Date.now()), userId, title, description, isCompleted: false };
  todos.push(todo);
  res.status(201).json(todo);
});

router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.json(todos);
  const list = todos.filter((t) => t.userId === String(userId));
  res.json(list);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const updated = { ...todos[idx], ...req.body };
  todos[idx] = updated;
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  todos.splice(idx, 1);
  res.status(204).end();
});

export default router;
