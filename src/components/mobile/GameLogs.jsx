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
      <div className="container my-4 mb-5 pb-5">
        <div className="d-flex justify-content-center mb-4 gap-3">
          <button className={`btn btn-sm btn-${selectedDate === "today" ? "light" : "outline-light"}`} onClick={() => setSelectedDate("today")}>
            {content?.log?.today}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "yesterday" ? "light" : "outline-light"}`} onClick={() => setSelectedDate("yesterday")}>
            {content?.log?.yesterday}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "this_week" ? "light" : "outline-light"}`} onClick={() => setSelectedDate("this_week")}>
            {content?.log?.this_week}
          </button>
          <button className={`btn btn-sm btn-${selectedDate === "last_week" ? "light" : "outline-light"}`} onClick={() => setSelectedDate("last_week")}>
            {content?.log?.last_week}
          </button>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark" className='text-center'>
            <thead>
              <tr>
                <th>
                  <small>{content?.log?.from}</small>
                </th>
                <th>
                  <small>{content?.log?.to}</small>
                </th>
                <th>
                  <small>{content?.log?.game_name}</small>
                </th>
                <th>
                  <small>{content?.log?.count}</small>
                </th>
                <th>
                  <small>{content?.log?.bet_amount}</small>
                </th>
                <th>
                  <small>{content?.log?.win_lose || "Win/Loss"}</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={6}>Loading....</td></tr> : logs && logs.length === 0 ? <tr><td colSpan={6}>{content?.no_data}</td></tr> : logs && logs.map((log, index) =>(
                <tr key={index}>
                  <td>{log.from}</td>
                  <td>{log.to}</td>
                  <td>{log.game_name}</td>
                  <td>{log.spin_count}</td>
                  <td>{parseFloat(log.turnover).toLocaleString()}</td>
                  <td className={log.win_loss >= 0 ? 'text-success' : 'text-danger'}>
                    {parseFloat(log.win_loss).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </div>

      </div>
    </>
  )
}
