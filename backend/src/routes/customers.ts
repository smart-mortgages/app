import {Request, Response, Router} from 'express';
import {client} from "../web3client";
import {customerABI, mortgageManagerABI, mortgageManagerAddress} from "../contracts";
import {Address} from "viem";
import {bigintReplacer} from "../utils/bigIntReplacer";
import fs from "fs";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(fs.readFileSync(__dirname + '/../../resources/mocks/customers.json', 'utf8'));
    return;

    // try {
    //     const customers = await client.readContract({
    //         address: mortgageManagerAddress as `0x${string}`,
    //         abi: mortgageManagerABI,
    //         functionName: 'getAllCustomers',
    //         args: []
    //     }) as Address[];
    //
    //     const customerDataPromises = customers.map(async (customer) => {
    //         const data = await client.readContract({
    //             address: customer,
    //             abi: customerABI,
    //             functionName: 'getData',
    //             args: []
    //         });
    //         return data;
    //     });
    //
    //     const customersData = await Promise.all(customerDataPromises);
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify(customersData, bigintReplacer));
    // } catch (error) {
    //     console.error('Error fetching customers:', error);
    //     res.status(500).json({error: 'Failed to fetch customers'});
    // }
});

export default router;
