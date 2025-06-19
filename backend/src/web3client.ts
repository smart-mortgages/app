import {createPublicClient, http, defineChain} from "viem";

const customChain = /*#__PURE__*/ defineChain({
    id: 72,
    name: 'Foundry',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
            webSocket: ['ws://127.0.0.1:8545'],
        },
    },
})

export const client = createPublicClient({
    chain: customChain,
    transport: http('http://127.0.0.1:8545')
});
