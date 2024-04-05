exports.authQ={
    "register":"insert into users(username,email,password) values(?,?,?)",
    "verfiy":"select * from users where email=? OR username=?",
    "login":"select * from users where email=? and password=?"
}