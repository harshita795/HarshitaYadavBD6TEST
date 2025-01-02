const express = require("express");
const app = express();
const cors = require("cors");
const {
  getAllPackages,
  getPackageByDestination,
  addBooking,
  updateAvaialabeSlot,
  getBookingByPackageId,
} = require("./controllers.js");

app.use(express.json());
app.use(cors());

app.get("/packages", (req, res) => {
  try {
    const response = getAllPackages();

    return res.status(200).json({ packages: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/packages/:destination", (req, res) => {
  try {
    const destination = req.params.destination;
    const response = getPackageByDestination(destination);

    return res.status(200).json({ package: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const response = await addBooking(req.body);

    return res.status(201).json({ booking: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/packages/update-seats", async (req, res) => {
  try {
    const { packageId, seatsBooked } = req.body;
    const response = await updateAvaialabeSlot(packageId, seatsBooked);

    return res.status(200).json({ package: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/bookings/:packageId", (req, res) => {
  try {
    const packageId = parseInt(req.params.packageId);
    const response = getBookingByPackageId(packageId);

    return res.status(200).json({ bookings: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// app.listen(3000, () => {
//   console.log(`Server is running at port 3000`);
// });

module.exports = { app };
