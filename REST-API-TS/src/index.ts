import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import createServer from './app';

const port = config.get("port") as number;
const host = config.get("host") as string;
const app = createServer();

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);
    connect();
    // routes(app);
});

