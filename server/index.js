import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import multer from "multer"
import morgan from "morgan"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import {register} from "./controllers/auth.js"
import {getUser} from "./controllers/users.js"
import postRoutes from "./routes/post.js";
import {getfirstName} from "./controllers/users.js"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";

import {getNewsfeedPosts,getUserPosts} from  "./controllers/post.js"
import User from "./models/User.js";

dotenv.config()
//Mongoose setup
const PORT = process.env.PORT || 6001
mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology : true,
    
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server Port : ${PORT}`))
//     // User.insertMany(users);
//     console.log("Database connected")
// } ).catch((error) => console.log(`${error} did not connect`))

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology : true,
            
        })
        console.log("db is connected")
    }catch(error){
        console.log("db is not connected")
        console.log(error.message)

    }
}



//configurations
const __filename= fileURLToPath(import.meta.url)
const __dirname=  path.dirname(__filename)
dotenv.config();

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit : "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit : "30mb" , extended: true}))
app.use(cors())
app.use("/images",express.static(path.join(__dirname, "public/images")))

//File Storage

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/images");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})


// app.get('/users/getUser',   async(req, res) => {
//     const name= req.body.lastName;
//     const user = await User.findOne({name})
//     res.json(user);
    // const firstName = "LLL"// Replace with your code to retrieve the first name from the backend
    // res.json({ firstName });
//   res.send({name});
//   });


app.get('/user/search', async (req, res) => {
    const { q } = req.query;
  
  try {
    // Perform a search query in the database to find matching users
    const users = await User.find({ name: { $regex: q, $options: 'i' } });

    // Map the users to the desired format for suggestions
    const suggestions = users.map((user) => ({
      id: user._id,
      name: user.name,
    }));

    res.json({ suggestions });
  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  });

app.listen(PORT, async () => {console.log(`Server Port : ${PORT}`)
    await connectDb()
}) 

const upload = multer({storage})

app.post("/auth/register" , upload.single("picture"),register)
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.post("/post", verifyToken, upload.single("picture"), createPost);
// app.use("/post",verifyToken,getNewsfeedPosts)
// app.use("/post",verifyToken,getUserPosts)

app.use("/post", postRoutes);
console.log("okaaayyy")
