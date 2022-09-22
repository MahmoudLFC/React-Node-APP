import {Request, Response} from "express";
import {getGatewayDropdown} from "../service/gateway.service";
import {get} from "lodash";

export async function getDropdown(req: Request, res: Response) {

    let dropdownOptions: any = [];
    const model: string = get(req, "params.model");
    if (model === 'gateway')
        dropdownOptions = await getGatewayDropdown({});
    return res.send(dropdownOptions);
}
