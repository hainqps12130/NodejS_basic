import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connection from "./config/connectDB"
import initAPIRoute from "./route/api";


require('dotenv') .config();

const app = express();
const port = process.env.PORT

//cấu hình bodyParser (gửi data lên server)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app)

//init web route
initWebRoute(app)

//init API route
initAPIRoute(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})