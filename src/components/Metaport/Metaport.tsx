
/**
 * @license
 * SKALE Metaport
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * @file Metaport.ts
 * @copyright SKALE Labs 2023-Present
 */

import {
    RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import {
    injectedWallet,
    coinbaseWallet,
    metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';

import { MetaportConfig } from "../../core/interfaces"

import WidgetUI from '../WidgetUI'

import '@rainbow-me/rainbowkit/styles.css';

import { constructWagmiChain, getWebSocketUrl } from '../../core/wagmi_network';


const { chains, webSocketPublicClient } = configureChains(
    [
        mainnet,
        goerli,
        constructWagmiChain('staging', "staging-legal-crazy-castor"),
        constructWagmiChain('staging', "staging-utter-unripe-menkar"),
        constructWagmiChain('staging', "staging-faint-slimy-achird"),
        constructWagmiChain('staging', "staging-perfect-parallel-gacrux"),
        constructWagmiChain('staging', "staging-severe-violet-wezen"),
        constructWagmiChain('staging', "staging-weepy-fitting-caph"),

        constructWagmiChain('mainnet', 'honorable-steel-rasalhague'),
        constructWagmiChain('mainnet', 'elated-tan-skat'),
        constructWagmiChain('mainnet', 'affectionate-immediate-pollux')
    ],
    [
        jsonRpcProvider({
            rpc: chain => ({
                http: chain.rpcUrls.default.http[0],
                webSocket: getWebSocketUrl(chain)
            }),
        })
    ]
);


const connectors = connectorsForWallets([
    {
        groupName: 'Supported Wallets',
        wallets: [
            metaMaskWallet({ chains, projectId: '' }),
            injectedWallet({ chains }),
            coinbaseWallet({ chains, appName: 'TEST' })
        ],
    }
]);


const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient: webSocketPublicClient
});


export default function Widget(props: {
    config: MetaportConfig
}) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                coolMode
                appInfo={{
                    appName: 'SKALE Metaport'
                }}
                showRecentTransactions={true}
                chains={chains}
            >
                <WidgetUI config={props.config} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}