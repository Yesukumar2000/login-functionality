// Step 1: Import libraries
let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 225 }, 
});

// Step 2: Initialize Express app
let app = express();
// Step 3: Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));
// Step 4: Connect to MongoDB
let connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employeesMDB");
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB", error);
  }
};

// Step 5: Define User schema
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: Number,
  profilePic: String,
});

// Step 6: Create User model
let User = mongoose.model("user", userSchema);

// Step 7:  POST API for user registration
app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    await User.insertMany([newUser]);
    console.log("User saved successfully");
    res.json({ status: "Success", msg: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.json({
      status: "Failure",
      msg: "Unable to create User",
      error: error.message,
    });
  }
});


app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);
   let userDetailsArr= await User.find().and({email:req.body.email})
   if(userDetailsArr.length > 0){
        if(userDetailsArr[0].password === req.body.password){
          let loggedInUserDetails ={
            firstName:userDetailsArr[0].firstName,
            lastName:userDetailsArr[0].lastName,
            age:userDetailsArr[0].age,
            email:userDetailsArr[0].email,
            mobileNo:userDetailsArr[0].mobileNo,
            profilePic:userDetailsArr[0].profilePic,


          }

          res.json({status:"success",data:loggedInUserDetails});
        }else{
          res.json({status:"failure",msg:"Invalid Password"})
         }
   }else{
    res.json({status:"failure",msg:"User doesnot Exist."})
   }
})


// Step 8: call the function
connectToMongoDB();
// step 9 - port
app.listen(7999, () => {
  console.log("Listening the port number is 7999");
});

