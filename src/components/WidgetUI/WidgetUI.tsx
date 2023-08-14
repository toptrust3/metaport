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
 * @file WidgetUI.ts
 * @copyright SKALE Labs 2023-Present
 */

import React, { useEffect } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

import { useAccount } from 'wagmi'

import Collapse from '@mui/material/Collapse'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close'

import skaleLogo from './skale_logo_short.svg'

import { useUIStore } from '../../store/Store'
import { useMetaportStore } from '../../store/MetaportState'
import SkPaper from '../SkPaper'

import WidgetBody from '../WidgetBody'

import { cls } from '../../core/helper'

import styles from '../../styles/styles.module.scss'
import common from '../../styles/common.module.scss'

import SkConnect from '../SkConnect'
import ErrorMessage from '../ErrorMessage'
import { MetaportConfig } from '../../core/interfaces'


export function WidgetUI(props: { config: MetaportConfig }) {

  const metaportTheme = useUIStore((state) => state.theme)
  const isOpen = useUIStore((state) => state.open)
  const setOpen = useUIStore((state) => state.setOpen)

  const { address } = useAccount()

  const errorMessage = useMetaportStore((state) => state.errorMessage)


  const handleClick = (_: React.MouseEvent<HTMLElement>) => {
    setOpen(isOpen ? false : true)
  }

  const themeCls = metaportTheme.mode === 'dark' ? styles.darkTheme : styles.lightTheme
  const commonThemeCls = metaportTheme.mode === 'dark' ? common.darkTheme : common.lightTheme

  let fabTop: boolean = false
  let fabLeft: boolean = false
  if (metaportTheme) {
    fabTop = metaportTheme.position.bottom === 'auto'
    fabLeft = metaportTheme.position.right === 'auto'
  }

  const fabButton = (
    <div className={cls(common.flex)}>
      <div className={fabLeft ? null : cls(common.flexGrow)}></div>
      <div className={common.flex}>
        <Fab
          color={isOpen ? 'secondary' : 'primary'}
          className={props.config.openButton ? styles.skaleBtn : styles.skaleBtnHidden}
          aria-label="add"
          type="button"
          onClick={handleClick}
        >
          {isOpen ? (
            <CloseIcon
              style={{
                color: metaportTheme.mode == 'dark' ? 'white' : 'black',
              }}
            />
          ) : (
            <img className={styles.skaleLogoSm} src={skaleLogo} />
          )}
        </Fab>
      </div>
    </div>
  )

  return (
    <div
      className={cls(styles.imaWidgetBody, themeCls, commonThemeCls)}
      style={metaportTheme ? { ...metaportTheme.position, zIndex: metaportTheme.zIndex } : null}
    >
      <div className={props.config.openButton ? common.margBott20 : null}>{fabTop ? fabButton : null}</div>
      <Collapse in={isOpen}>
        <SkPaper className={cls(styles.popper)}>
          <SkConnect />

          <Collapse in={!!errorMessage}>
            <ErrorMessage errorMessage={errorMessage} />
          </Collapse>
          <Collapse in={!errorMessage}>{address ? <WidgetBody config={props.config} /> : <div></div>}</Collapse>
        </SkPaper>
      </Collapse>
      <div className={props.config.openButton ? common.margTop20 : null}>{fabTop ? null : fabButton}</div>
    </div>
  )
}

export default WidgetUI
