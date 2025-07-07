import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SmallSpinner from './SmallSpinner';
import { AuthContext } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { content } = useContext(LanguageContext);

  return (
    <div>
      <form className="profileForm px-3 py-4 rounded-4">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.profile?.my_profile}</h5>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.username} : </div>
          <div className="col-7">
            <span className="text-white">{user?.user_name}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.full_name} : </div>
          <div className="col-7">
            <span className="text-white">{user?.name}</span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.profile?.phone} : </div>
          <div className="col-7">
            <span className="text-white">{user?.phone ?? ""}</span>
          </div>
        </div>
        {/* <div className="text-end mt-3">
          <button className="btn text-black navLoginBtn">
            {loading && <SmallSpinner />}
            Update Profile
          </button>
        </div> */}
      </form>
    </div>
  )
}

export default Profile
