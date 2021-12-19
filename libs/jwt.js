const jwt = require('jsonwebtoken');
const key ="nkcdbkfjbajnjaenvienifnu3y4734y34cbhjsbkjsf";
const expireSec  = 3000;

const verify=(req,res,next)=>{
    let token;
    if(req.cookies.token)
    {
        token=req.cookies.token;
        jwt.verify(token,key);
        next();
    }
    else
    {
        res.redirect("/student/login");
    }
}

module.exports = {
    verify
}


