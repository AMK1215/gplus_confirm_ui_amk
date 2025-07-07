import React, { useContext } from 'react'
import { Spinner, Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function WithdrawLog() {
  const { content } = useContext(LanguageContext);
  const { data: logs, loading } = useFetch(BASE_URL + "/withdrawlogfinicial");

  return (
    <>
      <div className="container my-4 mb-5 pb-5">
        {loading && <Spinner />}
        {logs && logs.length === 0 && (
          <div className="text-center">
            <h5>{content?.no_data}</h5>
          </div>
        )}
        <div className="row">
          {logs && logs.map((log, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="border p-3 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span className={`badge text-bg-${log.status == "Pending" ? "warning" : log.status == "Success" ? "success" : "danger"}`}>{log.status}</span>
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{content?.log?.date}</h6>
                  <span>{log.datetime}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{content?.wallet?.account_name}</h6>
                  <span>{log.account_name}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{content?.wallet?.account}</h6>
                  <span>{log.account_number}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{content?.log?.amount}</h6>
                  <span>{Number(log.amount).toLocaleString()} Ks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}