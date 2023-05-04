const express = require('express')
const app = express();
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;

const MONGOURI = process.env.MONGOURI;

const cors = require('cors')
app.use(cors())
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err);
})

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.listen(PORT,()=>{
    console.log(`Server is running on :${PORT}`);
})