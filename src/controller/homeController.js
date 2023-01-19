import mysql from "mysql2/promise";
import connection from "../config/connectDB"


let getHomePage = async (req, res) => {
    // let data = [];

    // connection.query(
    // 'SELECT * FROM `users` ',
    // function (err , results, fields) {
    //    results.map((row) => {
    //         data.push({
    //             id: row.id,
    //             email: row.email,
    //             address: row.address,
    //             firstName: row.firstName,
    //             lastName: row.lastName
    //         })
    //     })
    //     // return res.render('index.ejs', {dataUser: data} )
    // })

    //cú pháp ngắn gọn async
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    const [rows] = await connection.execute('SELECT * FROM `users`')
    res.render('index.ejs', {dataUser: rows})
  
}

let getdetailPage = async(req, res) => {
    let userId = req.params.id;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    let user = await connection.execute(`SELECT * FROM users where id = ?`, [userId]);
    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)',
    [firstName, lastName, email, address])

    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('delete from users where id = ?', [userId])
    return res.redirect('/')
}

let getEditPage = async(req, res) => {
    let id = req.params.id;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    let [user] = await connection.execute('Select * from users where id = ?', [id])
    return res.render('update.ejs', {dataUser: user[0]})
}

let postUpdateUser = async(req, res) => {
    let {firstName, lastName, email, address, id} = req.body;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?',
    [firstName, lastName, email, address, id])
    return res.redirect('/')
}


module.exports = {
    getHomePage, getdetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}