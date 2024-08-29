const express = require("express");
const { Location, Employee } = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Hello from application",
  });
});

// employee signup deatail
router.post("/signup", async (req, res) => {
  const { email, paswword } = req.body;
});

const geolocationCheckMiddleware = async (req, res, next) => {
  const userLocation = req.body;
  console.log("Received user location:", userLocation);

  const officeLocation = { latitude: 13.012449, longitude: 80.0003607 };

  const distance = getDistanceFromLatLonInMeters(
    userLocation.latitude,
    userLocation.longitude,
    officeLocation.latitude,
    officeLocation.longitude
  );

  if (distance <= 200) {
    // User is inside the geofence
    req.isWithinRadius = true;
  } else {
    // User is outside the geofence
    req.isWithinRadius = false;
  }

  next(); // Move to the next middleware or route handler
};

router.post(
  "/mark-attendance",
  geolocationCheckMiddleware,
  async (req, res) => {
    const { latitude, longitude, timestamp } = req.body;
    console.log("Processing attendance...");

    try {
      let location;
      if (req.isWithinRadius) {
        // Store the information in the "InsideFence" table
        location = await Location.create({
          latitude,
          longitude,
          timestamp,
          isInside: true,
        });
        console.log("location after mongoose", location);
        res.json({
          success: true,
          message:
            "User is inside the geofence. Attendance marked successfully!",
          location,
          key: 1,
        });
      } else {
        // Store the information in the "OutsideFence" table
        location = await Location.create({
          latitude,
          longitude,
          timestamp,
          isInside: false,
        });
        console.log("location after mongoose", location);
        res.json({
          success: true,
          message: "User is outside the geofence. Attendance recorded!",
          location,
          key: 0,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error processing attendance." });
    }
  }
);

// Helper function to calculate the distance between two coordinates
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}

router.post("/emp/signup", async (req, res) => {
  const { email, password, staffId } = req.body;
  console.log("before save emp signin", req.body);
  try {
    const emp = await Employee.findOne({
      email: req.email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmp = await Employee.create({
      email: email,
      password: hashedPassword,
    });
    console.log("here comes new employee", newEmp);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// router.post("emp/signin", async (req, res)=>{
//   const {email, password} = req.body;
//   try{
//     const emp = await Employee.findOne({
//       email 
//     })
//     if(!emp){
//         return res.json({
//           message : "User does not exist"
//         })
//     }
    
//   }
// })

module.exports = router;
// resoponse.key
