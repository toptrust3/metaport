import React, { useEffect } from 'react'
import { useCollapseStore } from '../../store/Store'
import { useMetaportStore } from '../../store/MetaportState'

import ChainsList from '../ChainsList'
import AmountInput from '../AmountInput'
import SkStepper from '../Stepper'
import SkPaper from '../SkPaper'
import AmountErrorMessage from '../AmountErrorMessage'
import SwitchDirection from '../SwitchDirection'
import { TokenBalance } from '../TokenList'
import DestTokenBalance from '../DestTokenBalance'

import common from '../../styles/common.module.scss'
import { cls } from '../../core/helper'
import { Collapse } from '@mui/material'

export function WidgetBody(props) {
  const expandedFrom = useCollapseStore((state) => state.expandedFrom)
  const setExpandedFrom = useCollapseStore((state) => state.setExpandedFrom)

  const expandedTo = useCollapseStore((state) => state.expandedTo)
  const setExpandedTo = useCollapseStore((state) => state.setExpandedTo)

  const token = useMetaportStore((state) => state.token)
  const chainName1 = useMetaportStore((state) => state.chainName1)
  const chainName2 = useMetaportStore((state) => state.chainName2)

  const setChainName1 = useMetaportStore((state) => state.setChainName1)
  const setChainName2 = useMetaportStore((state) => state.setChainName2)

  const mpc = useMetaportStore((state) => state.mpc)
  const tokens = useMetaportStore((state) => state.tokens)
  const setToken = useMetaportStore((state) => state.setToken)
  const tokenBalances = useMetaportStore((state) => state.tokenBalances)

  const transferInProgress = useMetaportStore((state) => state.transferInProgress)

  useEffect(() => {
    setChainName1(mpc.config.chains ? mpc.config.chains[0] : '')
    setChainName2(mpc.config.chains ? mpc.config.chains[1] : '')
  }, []);

  useEffect(() => {
    if (tokens && tokens.erc20) {
      setToken(Object.values(tokens.erc20)[0])
    }
  }, [tokens]);

  return (
    <div>
      <SkPaper gray className={common.noPadd}>
        <SkPaper background="transparent" className={common.noPadd}>
          <div className={cls(common.paddTop20, common.margLeft20, common.margRi20, common.flex)}>
            <p className={cls(common.noMarg, common.p, common.p4, common.pSecondary, common.flex, common.flexGrow)}>From</p>
            <div>
              {token ? <TokenBalance
                balance={tokenBalances[token.keyname]}
                symbol={token.meta.symbol}
                decimals={token.meta.decimals}
              /> : null}
            </div>
          </div>
          <ChainsList
            config={props.config}
            expanded={expandedFrom}
            setExpanded={setExpandedFrom}
            chain={chainName1}
            setChain={setChainName1}
            disabledChain={chainName2}
            disabled={transferInProgress}
            from={true}
          />
          {/* <Collapse in={!!chainName1}>
          <TokenList />
          </Collapse> */}
        </SkPaper>

        {/* <Collapse in={!!token}> */}
        <SkPaper gray className={cls()}>
          <AmountInput />
        </SkPaper>
        {/* </Collapse> */}
      </SkPaper>
      <SwitchDirection />
      <SkPaper gray className={common.noPadd}>
        <div className={cls(common.paddTop20, common.margLeft20, common.margRi20, common.flex)}>
          <p className={cls(common.noMarg, common.p, common.p4, common.pSecondary, common.flex, common.flexGrow)}>To</p>
          <DestTokenBalance />
        </div>
        <ChainsList
          config={props.config}
          expanded={expandedTo}
          setExpanded={setExpandedTo}
          chain={chainName2}
          setChain={setChainName2}
          disabledChain={chainName1}
          disabled={transferInProgress}
        />
      </SkPaper>
      <AmountErrorMessage />
      <SkPaper background="transparent">
        <SkStepper skaleNetwork={props.config.skaleNetwork} />
      </SkPaper>
    </div>
  )
}

export default WidgetBody
