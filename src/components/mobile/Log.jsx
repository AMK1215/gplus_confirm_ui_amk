import React, { useContext, useState } from 'react'
import { Table } from 'react-bootstrap'
import TransferLogs from './TransferLogs';
import GameLogs from '../mobile/GameLogs';
import DepositLog from '../mobile/DepositLog';
import WithdrawLog from '../mobile/WithdrawLog';
import { Link, useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';

const Log = () => {
  const { content } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  // console.log(type);

  const tabs = [
    { id: 1, name: content?.wallet?.deposit, value: "deposit", link: '/information?tab=logs&type=deposit' },
    { id: 2, name: content?.wallet?.withdraw, value: "withdraw", link: '/information?tab=logs&type=withdraw' },
    // { id: 3, name: content?.log?.transfer_log, value: "transfer_logs", link: '/information?tab=logs&type=transfer_logs' },
    { id: 3, name: content?.log?.game_log, value: "game_logs", link: '/information?tab=logs&type=game_logs' },
  ];

  return (
    <div className='container-fluid'>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 gap-sm-2">
        {tabs.map((tab, index) => {
          return <Link to={tab.link} className={`btn py-1 px-3 py-sm-2 px-sm-5 ${tab.value == type ? 'bg-warning text-light' : 'bg-dark text-white'}  `} key={index}>
            <p className="fw-semibold moneyTransferTabTitle">{tab.name}</p>
          </Link>
        })}
      </div>
      {/* cash in */}
      {type == "deposit" && (
        <DepositLog />
      )}
      {/* cash out */}
      {type == "withdraw" && (
        <WithdrawLog />
      )}
      {/* game logs */}
      {type == "game_logs" && (
        <GameLogs />
      )}
    </div>
  )
}

export default Log