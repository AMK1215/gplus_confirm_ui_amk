import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { LanguageContext } from '../../contexts/LanguageContext'
import useFetch from '../../hooks/useFetch'
import BASE_URL from '../../hooks/baseUrl'
import { message } from 'antd'
import useFormSubmit from '../../hooks/useFormSubmit'


const Deposit = () => {
  const { content } = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState('');
  const [refrence_no, setRefrence_no] = useState('');
  const { data: banks } = useFetch(BASE_URL + "/banks");
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setSelectedBank(banks[0]);
    }
  }, [banks]);

  const handleCopyText = (e) => {
    e.preventDefault();
    if (selectedBank?.account_number) {
      navigator.clipboard.writeText(selectedBank.account_number);
      message.success('Copied to clipboard');
    }
  };

  const {inputSubmit, error, loading, errMsg} = useFormSubmit();
  const deposit = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/depositfinicial";
    let inputData = {
      'agent_payment_type_id': selectedBank?.id,
      amount, 
      refrence_no
    }
    let method = "POST";
    let redirect = "/information?tab=logs&type=deposit";
    let msg = "Deposit successfully";
    await inputSubmit(url, inputData, method, redirect, msg);
  }



  return (
    <div>
      <form 
      className="profileForm px-3 py-4 rounded-4" 
      onSubmit={deposit}
      >
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.wallet?.deposit}</h5>
          <div className="text-end">
            <Button className='mx-auto mb-4' onClick={() => setShow(!show)} variant="outline-warning">{content?.wallet?.choose_bank}</Button>
          </div>
        </div>

        {selectedBank && (
          <div className="border border-light bg-transparent rounded-4 p-2 px-3 my-3 shadow-lg">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div>
                  <img
                    className="rounded-3 shadow"
                    src={"https://luckymillion.pro" + selectedBank.image}
                    width={50}
                    alt={selectedBank.payment_type}
                  />
                </div>
                <div className="ms-2">
                  <h6 className="fw-bold text-white">{selectedBank.payment_type}</h6>
                  <h6 className="fw-bold text-white">{selectedBank.account_number}</h6>
                </div>
              </div>
              <div>
                <button className="btn btn-outline-light" onClick={handleCopyText}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.wallet?.amount} : </div>
          <div className="col-7">
            <input type="text"
              className="form-control bg-transparent text-white placeholder-white" 
              placeholder={content?.wallet?.enter_amount}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            {error ? (error.amount && <span className='text-danger'>*{error.amount}</span>) : errMsg && <span className='text-danger'>*{errMsg}</span>}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.wallet?.receipt}</div>
          <div className="col-7">
    <input
  type="text"
  className="form-control bg-transparent text-white placeholder-white"
  placeholder={content?.wallet?.enter_last_6_digits}
  onChange={(e) => setRefrence_no(e.target.value)}
  value={refrence_no}
/>
            {error && error.refrence_no && <span className='text-danger'>*{error.refrence_no}</span>}
          </div>
        </div>
        <div className="text-end mt-3">
          <button 
          type='submit'
          className="btn text-black navLoginBtn">
            {loading && <Spinner className='me-1' animation="border" size="sm" />}
            {content?.wallet?.deposit}
          </button>
        </div>
      </form>


      <Modal show={show} onHide={() => setShow(false)} className='cursor-pointer infoBankAccModal'>
        <div className="px-1 py-2">
          <Modal.Header >
            <Modal.Title className=' text-center mx-auto'>
              <h5 className="fw-bold infoBankAccModalTitle">{content?.wallet?.choose_bank}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='row'>
            {banks && banks.map((bank, index) => {
              return <div key={index} onClick={() => {
                setShow(false)
                setSelectedBank(bank)
              }} className='d-flex gap-2 bg-white mb-2 p-2 rounded-3 text-black'>
                <img src={"https://luckymillion.pro" + bank.image} className='bankModalImg img-fluid rounded-2' />
                <div>
                  <p>{content?.wallet?.account} : {bank.account_number}</p>
                  <p>{content?.wallet?.account_name} : {bank.account_name}</p>
                </div>
              </div>
            })}
          </Modal.Body>
          <Modal.Footer >
            <button onClick={() => setShow(false)} className="navLoginBtn btn text-black fw-bold w-100">
              ပယ်ဖျက်သည်
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  )
}

export default Deposit
