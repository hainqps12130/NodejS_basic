import mysql from "mysql2/promise";


let getAllUser = async(req, res) => {

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    const [rows] = await connection.execute('SELECT * FROM `users`')
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async(req, res) => {
    let {firstName, lastName, email, address} = req.body;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)',
    [firstName, lastName, email, address])

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {

    let {firstName, lastName, email, address, id} = req.body;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('update users set firstName= ?, lastName= ?, email= ?, address= ? where id= ?',
    [firstName, lastName, email, address, id])

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async(req, res) => {
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'messing requied params'
        })
    }
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejsbasic'});
    await connection.execute('delete from users where id = ?', [userId])

    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}