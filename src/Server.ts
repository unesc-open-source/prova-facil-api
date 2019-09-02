import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/swagger";
import {$log} from "ts-log-debug";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const rootDir = __dirname;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    '/api': `${rootDir}/**/*Controller.ts`
  },
  logger: {
    debug: false,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  swagger: {
    path: "/api-docs"
  },
  httpPort: "127.0.0.1:3000",
  httpsPort: "localhost:3001"
})
export class Server extends ServerLoader {
  /**
   * @returns {Server}
   */
  $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  $onReady() {
    $log.debug("Servidor inicializado");
  }

  $onServerInitError(error): any {
    $log.error("Servidor encotrou um erro =>", error);
  }
}
