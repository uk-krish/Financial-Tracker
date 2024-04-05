const Dbconnection = require('../config/DBconfig');
const { authQ } = require('../model/authQuery');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const con = Dbconnection();
const dotenv=require('dotenv');
dotenv.config();


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        (await con).query(authQ.verfiy, [email,email], async (err, data) => {
            if (err)
                return res.json(err)
            if (data.length)
                return res.json({ message: "User Already Exit!!" });
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(password, salt);
            (await con).query(authQ.register, [username, email, hashPassword], (err, data) => {

                if (err)
                    return res.json(err)
                return res.json({ message: "User Register Successfully!!" })
            })
        })
    }
    catch (error) {
        console.error(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email} = req.body;
        (await con).query(authQ.verfiy, [email,email], async (err, data) => {
            if (err)
                return res.json(err)
            if (!data.length)
               return res.status(404).json({ message: "Wrong email or password!!" })
            const validPassword = await bcryptjs.compare(req.body.password, data[0].password);
            if (!validPassword)
                return res.status(401).json({ message: "Wrong email or password!!" })
            const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
            const{password,OauthStatus,...rest}=data[0];
            res.cookie("token", token, {
                httpOnly: true
            })
            return res.json({ message: "Login Successfully!!", user: rest})
        })
    }
    catch (error) {
        console.error(error);
    }
}
