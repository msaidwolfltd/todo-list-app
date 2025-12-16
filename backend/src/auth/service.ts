import bcrypt from "bcrypt";

type User = {
  id: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
};

const users: User[] = [];

export async function createUser(email: string, password: string, firstName?: string, lastName?: string) {
  const existing = users.find((u) => u.email === email.toLowerCase());
  if (existing) throw new Error("UserExists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: String(Date.now()), email: email.toLowerCase(), passwordHash, firstName, lastName };
  users.push(user);
  return { id: user.id, email: user.email, firstName, lastName };
}

export async function verifyUser(email: string, password: string) {
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, email: user.email };
}

export function findUserById(id: string) {
  const u = users.find((x) => x.id === id);
  if (!u) return null;
  return { id: u.id, email: u.email };
}
