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
 * @file sfuel.ts
 * @copyright SKALE Labs 2022-Present
 */

import Web3 from 'web3';
import { DEFAULT_MIN_SFUEL_WEI } from './constants';


function getFaucetUrl(chainsMetadata: Object, chainName: string): string {
    if (chainsMetadata && chainsMetadata[chainName]) return chainsMetadata[chainName].faucetUrl;
}


function getMinSfuelWei(chainsMetadata: Object, chainName: string): string {
    if (chainsMetadata && chainsMetadata[chainName] && chainsMetadata[chainName].minSfuelWei) {
        return chainsMetadata[chainName].minSfuelWei;
    } else {
        return DEFAULT_MIN_SFUEL_WEI;
    }
}


async function getSfuelBalance(web3: Web3, address: string): Promise<string> {
    return await web3.eth.getBalance(address);
}


export async function getSFuelData(
    chainsMetadata: Object,
    chainName: string,
    web3: Web3,
    address: string
): Promise<Object>{
    const minSfuelWei = getMinSfuelWei(chainsMetadata, chainName);
    const balance = await getSfuelBalance(web3, address);
    return {
        faucetUrl: getFaucetUrl(chainsMetadata, chainName),
        minSfuelWei: minSfuelWei,
        balance: balance,
        ok: Number(balance) >= Number(minSfuelWei)
    }
}
