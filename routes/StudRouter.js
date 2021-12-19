const router = require("express").Router();
const Student = require("../models/Student");
const jwt = require('jsonwebtoken');
const key ="nkcdbkfjbajnjaenvienifnu3y4734y34cbhjsbkjsf";
const expireSec  = 3000;
const { verify } = require("../libs/jwt")

router.get("/",verify,(req,res) => {
    Student.find()
    .then((data) => {
        res.render("StList",{StudentList:data,data:true});
    })
    .catch((err) => {
        console.log(err);
        res.send(`Internal Error ${err}`);
    })
});

router.get("/add",verify,(req,res) =>{
    res.render("StAdd");
})

router.post("/add",verify,(req,res) => {
    let student = new Student({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        password:req.body.password,
    });
    student.save()
    .then((data) => {
        res.redirect("/student");
    })
    .catch((err) =>{
        console.log(err);
    })
});

router.get("/login",(req,res) => {
    res.render("Login");
})

router.post("/login",(req,res) => {
    const {email,password}=req.body;
    console.log(email);
    console.log(password);

    Student.findOne({email: email,password:password})
    .then((result) => {
        try {
            if(result){
                const token=jwt.sign({email:req.body.email},key,{expiresIn:expireSec});
                res.cookie("token",token,{maxAge:expireSec*1000});
                res.redirect("/student");
            }
            else
            {
                res.json({message:"Invalid email/password"});
            }
        } catch (error) {
            res.send(error);
        }
    })
    .catch((err) => {
        console.log(err);
    })

})

router.get('/:id',verify,(req,res) => {
    let ID = req.params.id;
    Student.findById(ID)
    .then((data) => {
        res.render("StEdit",{List:data})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.post('/edit',verify,upload,(req,res) => {
   
        let databody = {
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
        }
        Student.findByIdAndUpdate({"_id":req.body.id},req.body,{new:true})
        .then((data) => {
            res.redirect("/student");
        })
        .catch((err) =>{
            console.log(err);
            res.send("Data not updated");
        })
});

router.get('/delete/:id',verify,(req,res) => {
    let ID = req.params.id;
    Student.findByIdAndDelete({"_id":ID})
    .then((data) => {
        res.redirect("/student");
    })
    .catch((err) =>{
        console.log(err);
        res.send("Data not Deleted");
    })
});

module.exports = router;


