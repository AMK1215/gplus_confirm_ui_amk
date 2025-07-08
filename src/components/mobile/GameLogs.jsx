import React, { useContext, useState } from 'react'
import { Table } from 'react-bootstrap'
import { LanguageContext } from '../../contexts/LanguageContext';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';


export default function GameLogs() {
  const { content } = useContext(LanguageContext);
  const [selectedDate, setSelectedDate] = useState('today');
  const {data:logs, loading} = useFetch(`${BASE_URL}/player/game-logs?type=${selectedDate}`); 

  return (
    <>
      <div className="max-w-2xl mx-auto my-4 mb-5 pb-5 px-2">
        <div className="flex justify-center mb-4 gap-2 flex-wrap">
          <button className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${selectedDate === 'today' ? 'bg-yellow-400 text-black shadow' : 'bg-gray-800 text-white border border-gray-600 hover:bg-yellow-100 hover:text-black'}`} onClick={() => setSelectedDate('today')}>
            {content?.log?.today}
          </button>
          <button className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${selectedDate === 'yesterday' ? 'bg-yellow-400 text-black shadow' : 'bg-gray-800 text-white border border-gray-600 hover:bg-yellow-100 hover:text-black'}`} onClick={() => setSelectedDate('yesterday')}>
            {content?.log?.yesterday}
          </button>
          <button className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${selectedDate === 'this_week' ? 'bg-yellow-400 text-black shadow' : 'bg-gray-800 text-white border border-gray-600 hover:bg-yellow-100 hover:text-black'}`} onClick={() => setSelectedDate('this_week')}>
            {content?.log?.this_week}
          </button>
          <button className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${selectedDate === 'last_week' ? 'bg-yellow-400 text-black shadow' : 'bg-gray-800 text-white border border-gray-600 hover:bg-yellow-100 hover:text-black'}`} onClick={() => setSelectedDate('last_week')}>
            {content?.log?.last_week}
          </button>
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-400 font-semibold">Loading...</div>
          ) : logs && logs.length === 0 ? (
            <div className="text-center py-8 text-gray-400 font-semibold">{content?.no_data}</div>
          ) : logs && logs.map((log, index) => (
            <div key={index} className="rounded-xl border border-gray-700 bg-white/10 shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-xs md:text-sm">
                <div><span className="font-semibold text-gray-400">{content?.log?.from}:</span> <span>{log.from}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.to}:</span> <span>{log.to}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.game_name}:</span> <span>{log.game_name}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.count}:</span> <span>{log.spin_count}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.bet_amount}:</span> <span>{parseFloat(log.turnover).toLocaleString()}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.win_lose || 'Win/Loss'}:</span> <span className={log.win_loss >= 0 ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{parseFloat(log.win_loss).toLocaleString()}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
