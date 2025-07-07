import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import useFormSubmit from '../../hooks/useFormSubmit';
import { LanguageContext } from '../../contexts/LanguageContext';

const WithDraw = () => {
  const { user } = useContext(AuthContext);
  const { content } = useContext(LanguageContext);
  const { data: banks } = useFetch(BASE_URL + "/banks");
  const [payment, setPayment] = useState('');
  const [account_name, setAccountName] = useState('');
  const [account_number, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');

  const { inputSubmit, error, loading, errMsg } = useFormSubmit();
  const withdraw = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/withdrawfinicial";
    let inputData = { payment_type_id: payment, account_name, account_number, amount, password };
    let method = "POST";
    let redirect = "/information?tab=logs&type=withdraw";
    let msg = "Withdraw Success";
    await inputSubmit(url, inputData, method, redirect, msg);
  }

  return (
    <div>
      <ToastContainer />
      <div className="profileForm px-3 py-4 rounded-4">
        <form onSubmit={withdraw}>
          <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.wallet?.balance} : </div>
            <div className="col-7">
              <input type="text"
                className="form-control bg-transparent text-white"
                disabled
                value={user && Number(user.balance).toLocaleString()} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">
              {content?.wallet?.choose_bank} :
            </div>
            <div className="col-7">
              <select className="form-control form-select bg-dark text-white" onChange={e => setPayment(e.target.value)} value={payment}>
                <option value="">{content?.wallet?.choose_bank}</option>
                {banks && banks.map((item, index) => (
                  <option key={index} value={item.id}>{item.payment_type}</option>
                ))}
              </select>
              {error && error.payment_type_id && <small className="text-danger">*{"ငွေပေးချေမှုနည်းလမ်း ရွေးချယ်ပါ။"}</small>}
            </div>
          </div>
          <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.wallet?.account_name} : </div>
            <div className="col-7">
              <input type="text"
                className="form-control bg-transparent text-white placeholder-white"
                placeholder={content?.wallet?.enter_account_name}
                value={account_name}
                onChange={(e) => setAccountName(e.target.value)}
              />
              {error && error.account_name && <span className="text-danger">*{error.account_name}</span>}
            </div>
          </div>
          <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.wallet?.account}: </div>
            <div className="col-7">
              <input type="text"
                className="form-control bg-transparent text-white placeholder-white"
                placeholder={content?.wallet?.enter_account}
                value={account_number}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              {error && error.account_number && <span className="text-danger">*{error.account_number}</span>}
            </div>
          </div>
          <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.wallet?.amount} : </div>
            <div className="col-7">
              <input type="number"
                className="form-control bg-transparent text-white placeholder-white"
                placeholder={content?.wallet?.enter_amount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {error && error.amount && <span className="text-danger">*{error.amount}</span>}
            </div>
          </div>
          <div className="row mt-2">
            <div className="profileTitle col-5 mt-2">{content?.auth?.password} : </div>
            <div className="col-7">
              <input type="password"
                className="form-control bg-transparent text-white placeholder-white"
                placeholder={content?.auth?.enter_password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && error.password && <span className="text-danger">*{error.password}</span>}
            </div>
          </div>
          <div className="text-end mt-3">
            {loading ? <Spinner /> :
              <button type='submit' className="btn text-black navLoginBtn">
                {content?.wallet?.withdraw}
              </button>}
          </div>
        </form>
      </div>

    </div>
  )
}

export default WithDraw