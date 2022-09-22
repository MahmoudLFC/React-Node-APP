import express from "express";
import cors from 'cors';
import routes from "./routes";

const createServer = () => {
    const app = express();
    const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
    const options: cors.CorsOptions = {
        origin: allowedOrigins
    };

    app.use(cors(options));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    routes(app);
    return app;
}
export default createServer;




