import {createPublicClient, http, defineChain, createWalletClient, Hex} from "viem";
import {foundry} from "viem/chains";
import { privateKeyToAccount } from 'viem/accounts';

// const customChain = /*#__PURE__*/ defineChain({
//     id: 1337,
//     name: 'Foundry',
//     nativeCurrency: {
//         decimals: 18,
//         name: 'Ether',
//         symbol: 'ETH',
//     },
//     rpcUrls: {
//         default: {
//             http: ['http://anvil-node-innovation-machine.treasuryai.cloud'],
//             webSocket: ['ws://anvil-node-innovation-machine.treasuryai.cloud'],
//         },
//     },
// })

export const client = createPublicClient({
    chain: foundry,
    transport: http('http://anvil-node-innovation-machine.treasuryai.cloud')
});

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

export const walletClient = createWalletClient({
    chain: foundry,
    transport: http('http://anvil-node-innovation-machine.treasuryai.cloud'),
    account: account
});
