const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/getAt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 10,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const locationSchema = new mongoose.Schema({
  latitude: { 
    type: Number, 
    required: true 
    },
  longitude: { 
    type: Number,
    required: true 
    },
  timestamp: {
    type: Date, 
    required: true
 },
  isInside : {
    type : Boolean
  }
});

const employeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 10,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  staffId : {
    type : String,
    require : true,
  } 
})


const Location = mongoose.model("Location", locationSchema);
const Employee = mongoose.model("Employee", employeSchema) 
const Admin = mongoose.model("Admin", adminSchema);
console.log('madhu1');

module.exports = {
  Admin,
  Location,
  Employee
};
