const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Auth Routes
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, password } });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (user && user.password === password) {
    res.json({ message: "Login successful", userId: user.id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Clothing Items Routes
app.get("/clothing-items", async (req, res) => {
  try {
    const items = await prisma.clothingItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clothing items" });
  }
});

app.post("/clothing-items", async (req, res) => {
  const { name, description, price, size, color, category } = req.body;
  try {
    const newItem = await prisma.clothingItem.create({
      data: { name, description, price: parseFloat(price), size, color, category }
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add clothing item" });
  }
});

app.delete("/clothing-items/:id", async (req, res) => {
  try {
    await prisma.clothingItem.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Cart Routes
app.post("/cart", async (req, res) => {
  const cartItem = await prisma.cartItem.create({ 
    data: { clothingItemId: req.body.clothingItemId } 
  });
  res.json(cartItem);
});

app.get("/cart", async (req, res) => {
  const cart = await prisma.cartItem.findMany({
    include: { clothingItem: true }
  });
  res.json(cart);
});

app.delete("/cart/:id", async (req, res) => {
  await prisma.cartItem.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: "Item removed from cart" });
});

// Contact Route
app.post("/contact", async (req, res) => {
  const contact = await prisma.contactMessage.create({ data: req.body });
  res.json({ message: "Message sent successfully", contact });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));