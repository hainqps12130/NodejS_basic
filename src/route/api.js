import express from "express";
import APIController from '../controller/APIController.js';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUser)//method : GET
    router.post('/create-user', APIController.createNewUser)//method : POST -> CREATE DATA
    router.put('/update-user', APIController.updateUser)//method : PUT -> Update DATA
    router.delete('/delete-user/:id', APIController.deleteUser)//method : Delete -> Xóa DATA

    return app.use('/api/v1/', router)
}

export default initAPIRoute;