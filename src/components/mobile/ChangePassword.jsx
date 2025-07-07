import React, { useContext, useState } from 'react'
import SmallSpinner from "./SmallSpinner"
import { LanguageContext } from '../../contexts/LanguageContext';
import useFormSubmit from "../../hooks/useFormSubmit";
import BASE_URL from '../../hooks/baseUrl';
import { Spinner } from 'react-bootstrap';

const ChangePassword = () => {
  const { content } = useContext(LanguageContext);
  const [current_password, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const {inputSubmit, error, loading, errMsg} = useFormSubmit();
  const changePassword = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/change-password";
    let inputData = {current_password, password, password_confirmation};
    let method = "POST";
    let redirect = "/information?tab=profile";
    let msg = "Password changed successfully";
    await inputSubmit(url, inputData, method, redirect, msg);
  }

  return (
    <div>
      <form className="profileForm mb-5 px-3 mt-4 py-4 rounded-4" onSubmit={changePassword}>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.profile?.change_password}</h5>
          <div>
            {errMsg && (
              <div className="alert alert-danger alert-dismissible" role="alert">
                {errMsg}
              </div>
            )}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.old_password}</div>
          <div className="col-7">
            <input type="password"
              className="form-control bg-transparent text-white"
              onChange={e => setCurrentPassword(e.target.value)}
              value={current_password}
            />
            {error && error.current_password && (<span className='text-danger'>*{error.current_password}</span>)}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.new_password}</div>
          <div className="col-7">
            <input type="password"
              className="form-control bg-transparent text-white"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {error && error.password && (<span className='text-danger'>*{error.password}</span>)}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.confirm_password}</div>
          <div className="col-7">
            <input type="password"
              className="form-control bg-transparent text-white"
              onChange={e => setPasswordConfirmation(e.target.value)}
              value={password_confirmation}
            />
            {error && error.password_confirmation && (<span className='text-danger'>*{error.password_confirmation}</span>)}
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-danger text-white" type="submit">
            {loading && <Spinner size="sm" className='me-1' />}
            {content?.profile?.change_password}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
