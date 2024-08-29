const  express = require("express");
// const cookiesParse  = require("cookie-parse");
const app = express();
const PORT = 3000;
app.use(express.json());

const webRouter = require("./routes/webRoute");
const appRouter = require("./routes/appRoute");

// app.use(cookieParser());


app.use('/api/web',webRouter);
app.use('/api/app',appRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})