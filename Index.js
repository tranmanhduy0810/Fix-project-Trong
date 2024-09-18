const express = require('express');

const router=express.Router();

let app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("./views"));
app.set('view engine', 'ejs');
app.set('views', './views');

//===========CODE Begin==================
app.use("/", router);
router.get("/", (req,res,next)=>{ 
    res.render('./page/clients/index.ejs');
});

app.use("/forgot", router);
router.get("/", (req,res,next)=>{ 
    res.render('./page/clients/forgot.ejs');
});

app.use("/customer", router);
router.get("/", (req,res,next)=>{ 
    res.render('./page/clients/customer.ejs');
});




//============END CODE=================
module.exports=router
let port = process.env.PORT || 6969;
app.listen(port, () => {
  //callback
  console.log("Server dang hoat dong: http://localhost:" + port);
});