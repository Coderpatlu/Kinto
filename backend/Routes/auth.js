const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.post('/signup', async (req, res)=> {
    const {name, email, password} = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ 
        name,
        email,
        password: hashed
    });

    await user.save();

    res.json({
        massage: "User Created Successfully"
    });
});

module.exports = router;