import {IAPIClientConf} from "./src/types";

declare module "api-client-conf.json" {
    const value: IAPIClientConf;
    export default value;
}
