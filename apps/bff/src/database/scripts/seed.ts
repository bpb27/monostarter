import { db } from "../database.js";
import { hashPassword } from "../utils/hash_password.js";

const users = [
  {
    email: "bobby@example.com",
    firstName: "Bobby",
    lastName: "Bigbags",
  },
  {
    email: "timmy@example.com",
    firstName: "Timmy",
    lastName: "Tubatoots",
  },
  {
    email: "linda@example.com",
    firstName: "Linda",
    lastName: "Lightballoons",
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    await db.deleteFrom("users").execute();
    console.log("✓ Cleared existing users");
    const mappedUsers = await Promise.all(
      users.map(async user => ({ ...user, passwordHash: await hashPassword("password") })),
    );
    await db.insertInto("users").values(mappedUsers).execute();
    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

seed();
