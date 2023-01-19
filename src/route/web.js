import express from "express";
import homeController from "../controller/homeController"

let router = express.Router();

//mo hình MVC
const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getdetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get("/edit-user/:id", homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser)



    return app.use('/', router)
}

export default initWebRoute;