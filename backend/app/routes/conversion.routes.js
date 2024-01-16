module.exports=app=>{
    const conversion=require('../controllers/conversion.controller.js');
    var router = require('express').Router();
    router.post("/conversion",conversion.conversion);
    app.use('/api/conversion',router);
}
