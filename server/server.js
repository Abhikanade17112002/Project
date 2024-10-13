require("dotenv").config() ;
const express = require("express") ;
const cors = require("cors") ;
const cookieParser = require("cookie-parser");
const connectToDatabase  = require("./utiils/connectToDatabase") ;
const autheticationRoter  = require("./routes/authentication.routes") ;
const companyRouter = require("./routes/company.routes") ;
const jobsRouter = require("./routes/job.routes") ;
const applicationRouter = require("./routes/application.routes") ;
const path = require("path");
connectToDatabase()
.then(() => {

    const app = express() ;

    const _dirname = path.resolve() ;
    
    // Middlewares
    app.use(cors({
        origin : "https://careercruise-4kbt.onrender.com",
        credentials:true,
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    // Routes
    // This Is A Comment
    // app.get("/",(request,response)=>{
    //     response.send("Hello Abhishek");
    // })
    app.use("/api/job",jobsRouter);

    app.use("/api/company",companyRouter);
    
    app.use("/api/auth",autheticationRoter);
    app.use("/api/application",applicationRouter);

    
    // Static
    app.use(express.static(path.join(_dirname,"/client/dist"))) ;
    app.get("*",(request,response)=>{
        response.sendFile(path.join(_dirname,"/client/dist/index.html"));
        });
    app.listen(process.env.PORT , () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
}) ;
