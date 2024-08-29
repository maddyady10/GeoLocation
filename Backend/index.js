const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = 8000;

// Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  credentials: true,               // Allow cookies to be sent with the request
}));

app.use(express.json());

const webRouter = require("./routes/webRoute");
const appRouter = require("./routes/appRoute");

app.use('/api/web', webRouter);
app.use('/api/app', appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
