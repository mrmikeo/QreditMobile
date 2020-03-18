import axios from 'axios';
export interface INode {
    ip: string;
    port: number;
}

/**
 * GetNodesList
 * Getting node list from GitHub
 */
export async function GetNodesList(): Promise<Array<INode>> {
    return await (await axios.get('https://raw.githubusercontent.com/Qredit/peers/master/mainnet.json')).data as Array<INode>;
}