import React, { useContext, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import { LanguageContext } from '../../contexts/LanguageContext';
import { FaRegCalendarAlt, FaUser, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

export default function DepositLog() {
  const { content } = useContext(LanguageContext);
  const { data: logs, loading } = useFetch(BASE_URL + "/depositlogfinicial");

  return (
    <>
      <div className="max-w-2xl mx-auto my-4 mb-5 pb-5 px-2">
        <h2 className="text-2xl font-extrabold text-yellow-400 mb-6 text-center tracking-wide drop-shadow">Deposit Log</h2>
        {loading && <div className="text-center py-8 text-gray-400 font-semibold">Loading...</div>}
        {logs && logs.length === 0 && (
          <div className="text-center py-8 text-gray-400 font-semibold">
            <h5>{content?.no_data}</h5>
          </div>
        )}
        <div className="space-y-6">
          {logs && logs.map((log, index) => (
            <div className="rounded-2xl border border-gray-700 bg-white/5 shadow-lg p-5 hover:shadow-2xl transition flex flex-col gap-3" key={index}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow
                  ${log.status === 'Pending' ? 'bg-yellow-300 text-yellow-900' : log.status === 'Success' ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'}`}
                >
                  {log.status === 'Pending' && <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>}
                  {log.status === 'Success' && <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
                  {log.status === 'Failed' && <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>}
                  {log.status}
                </span>
                <FaMoneyBillWave className="ml-2 text-yellow-400 text-lg" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-blue-400" />
                  <span className="font-semibold text-gray-300">{content?.log?.date}:</span>
                  <span className="text-white ml-1">{log.datetime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-green-400" />
                  <span className="font-semibold text-gray-300">{content?.wallet?.account_name}:</span>
                  <span className="text-white ml-1">{log.account_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCreditCard className="text-pink-400" />
                  <span className="font-semibold text-gray-300">{content?.wallet?.account}:</span>
                  <span className="text-white ml-1">{log.account_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-400" />
                  <span className="font-semibold text-gray-300">{content?.log?.amount}:</span>
                  <span className="text-white ml-1">{Number(log.amount).toLocaleString()} Ks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
