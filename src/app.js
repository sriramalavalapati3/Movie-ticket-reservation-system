const express = require('express');
const app = express();
app.use(express.json());
const db = require("../models/index");
const {getRouter}=require("./routes/get.routes")
const {postRouter}=require("./routes/post.routes")
app.use("/",getRouter);
app.use("/",postRouter)
 

app.get("/",async(req,res)=>{
    try {
        res.send("hi from server")
    } catch (error) {
        res.send(error.message)
    }
})



db.sequelize.sync().then(() => {
    app.listen(8080, () => {
      console.log("Second Server Started");
    });
  });