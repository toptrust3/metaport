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
 * @file IMAWidget.ts
 * @copyright SKALE Labs 2022-Present
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

import{ Widget } from './components/Widget';
import { externalEvents } from './core/events';
import defaultTokens from './metadata/tokens.json';


export default class IMAWidget {
    constructor(params: any) {
      const widgetEl: HTMLElement = document.getElementById('ima-widget');  
      const root = createRoot(widgetEl);
      // params validation + transformation here

      let tokens = params.tokens ? params.tokens : defaultTokens[params.network];
      if (!params['chains']) {
        // todo: ALL network chains (request from proxy!)
      }

      root.render(
        <Widget
          tokens={tokens}
          schains={params['schains']}
          schainAliases={params['schainAliases']}
          open={params['open']}
          network={params['network']}
          theme={params['theme']}
          mainnetEndpoint={params['mainnetEndpoint']}
        />
      );
    }

    requestTransfer(params) { externalEvents.requestTransfer(params) }
    requestBalance(params) { externalEvents.requestBalance(params) }
    setTheme(theme) { externalEvents.setTheme(theme) }
    close() { externalEvents.close() }
    open() { externalEvents.open() }
    reset() { externalEvents.reset() }
}
  