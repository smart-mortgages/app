import {createPublicClient, http, defineChain} from "viem";
import {foundry} from "viem/chains";

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
