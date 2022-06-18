const express = require('express');
const dotenv = require('dotenv');
const path = require("path");
const notes = require('./data/notes');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middlewares/errormiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.send('Shubh');
})



app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("shubh");
  });
}

app.listen(PORT, () => {
    console.log('server is running')
})