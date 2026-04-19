import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";
import {eq} from "drizzle-orm"; 

const app = express();
const PORT = 5000;

const router = express.Router();

app.use(express.json());



router.get("/cars", async (req, res) => {
  try {
    const allCars = await db.select().from(cars);
    res.json(allCars);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

router.post("/cars", async (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    return res.status(400).json({
      error: "Please provide make, model, year, and price",
    });
  }
  const [newCar]=await db.insert(cars).values({ make, model, year, price }).returning();
  res.status(201).json(newCar); 
}
);

  
router.put("/cars/:id", async (req, res) => {
  try {
    const carId = parseInt(req.params.id);
    const { make, model, year, price } = req.body;

    console.log(req.body);

    if (!make || !model || !year || !price) {
      return res.status(400).json({
        error: "Please provide make, model, year, and price",
      });
    }

    const [existingCar] = await db
      .select()
      .from(cars)
      .where(eq(cars.id, carId));

    if (!existingCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    const [updatedCar] = await db
      .update(cars)
      .set({
        make,
        model,
        year: parseInt(year),
        price: price.toString(),
        updatedAt: new Date(),
      })
      .where(eq(cars.id, carId))
      .returning();

    res.json({
      message: "Car updated successfully",
      car: updatedCar,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update car" });
  }
});

router.delete("/cars/:id", async (req, res) => {
  try {
    const carId = parseInt(req.params.id);

    const [existingCar] = await db
      .select()
      .from(cars)
      .where(eq(cars.id, carId));

    if (!existingCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    await db.delete(cars).where(eq(cars.id, carId));

    res.json({ message: "Car deleted successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete car" });
  }
});

router.get("/cars/:id", async (req, res) => {
  try {
    const carId = parseInt(req.params.id);
    const [existingCar] = await db
      .select()
      .from(cars)
      .where(eq(cars.id, carId));

    if (!existingCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(existingCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
