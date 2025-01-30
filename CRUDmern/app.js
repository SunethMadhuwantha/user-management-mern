
//pw  9ZmcO5JEuoxjwvAX

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");
//moddleware
app.use(express.json())

app.use(cors());
app.use("/users", router)
app.use("/file", express.static("file"))

mongoose.connect("mongodb+srv://Suneth:9ZmcO5JEuoxjwvAX@cluster0.nx1ir.mongodb.net/")
    .then(() => console.log("CONNECTED TO MongoDB vroo000000o")
    ).then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log((err))
    );


    // register
    require("./Models/Register");
    const User = mongoose.model("Register");
    app.post("/register", async (req, res) => {
        const { name, gmail, password } = req.body;
        try{
            await User.create({
                name,
                gmail,
                password
            })
            res.send({states:"ok"});
        }catch(err){
            res.send({status:"err"})
        }
    })

    //login
    app.post("/login", async (req, res) => {
        const { gmail, password } = req.body;
        try{
            const user = await User.findOne({ gmail });
            if(!user ){
                return res.json({err:"User Not Found"})
            }
            if(user.password===password ){
                return res.json({status:"ok"});
            }
            else{
                return res.json({error:"Invalid Password"})
            }
        }catch(err){
            console.error(err);
            res.status(500).json({err:"server error"})
            
        }
    })

    //pdf part
    const multer=require("multer");
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './file');
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null, uniqueSuffix + file.originalname);
            }
    });

    //pdf upload part
    require("./Models/PdfModel");
    const pdfSchema=mongoose.model("PdfDetails");
    const upload = multer({storage});
    app.post("/uploadfile",upload.single('file'), async (req, res) => {
        console.log(req.file);
        const title = req.body.title;
        const pdf = req.file.filename;

        try {
            await pdfSchema.create({title: title, pdf:pdf });
            console.log("PDF upload succesful");
            res.send({status: 200});
        } catch (error) {
            console.error(error);
            res.status(500).send({status :"Error "});}}
        );

        //
        app.get("/getfile",async (req, res) => {
            try {
                const data = await pdfSchema.find({});
                res.send({status:200,data:data});
            }catch (err){
                console.log(err);
                res.status(500).send({status:"error"});
            }
        });

//imgupload

require("./Models/ImgModel");
    const imgSchema=mongoose.model("ImageModel");
    const multerimg = require("multer");
    const storageimg = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../crud-mern-frontend/src/Components/ImgUploader/file');
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now();
            cb(null, uniqueSuffix + file.originalname);
            }});

const uploadimg = multerimg({storage: storage});
app.post("/uploadimg",uploadimg.single("image"),async (req, res) => {
    console.log(req.body);
    const imageName = req.file.filename;
    try{
        await imgSchema.create({image: imageName});
        res.send({status:"ok"});}
        catch(err){
        
        res.json({status:"error"});
    }}
    ) ;



        //getimg
    app.get("/getImage",async (req, res) => {
        try {
            imgSchema.find({}).then((data) => {res.send({status:"ok",data:data});});}
        catch (err){
            console.log(err);
            res.json({status:"error"});
        }
    });

        