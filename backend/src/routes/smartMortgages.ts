import {Request, Response, Router} from 'express';
import {client} from "../web3client";
import {mortgageManagerABI, mortgageManagerAddress, smartMortgageABI} from "../contracts";
import {Address} from "viem";
import {bigintReplacer} from "../utils/bigIntReplacer";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const mortgages = await client.readContract({
            address: mortgageManagerAddress as `0x${string}`,
            abi: mortgageManagerABI,
            functionName: 'getAllSmartMortgages',
            args: []
        }) as Address[];

        const mortgagePromises = mortgages.map(async (mortgage) => {
            const data = await client.readContract({
                address: mortgage,
                abi: smartMortgageABI,
                functionName: 'getData',
                args: []
            });
            const rules = await client.readContract({
                address: mortgage,
                abi: smartMortgageABI,
                functionName: 'getRules',
                args: []
            });
            const personalIdNumber = await client.readContract({
                address: mortgage,
                abi: smartMortgageABI,
                functionName: 'getCustomerPersonalIdNumber',
                args: []
            });
            const interestRate = await client.readContract({
                address: mortgage,
                abi: smartMortgageABI,
                functionName: 'getInterestRate',
                args: []
            });
            return {
                data: data,
                rules: rules,
                personalIdNumber: personalIdNumber,
                interestRate: interestRate,
            };
        });

        const mortgageResponse = await Promise.all(mortgagePromises);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mortgageResponse, bigintReplacer));
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({error: 'Failed to fetch customers'});
    }
});

export default router;
