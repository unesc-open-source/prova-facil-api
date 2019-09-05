import {$log} from "ts-log-debug";
import {Server} from "./Server";

$log.debug("Iniciando servidor...");
new Server().start().catch((er) => {
  $log.error(er);
});
