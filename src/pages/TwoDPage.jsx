// TwoDPage.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// React-Bootstrap Modal is kept for simplicity.
import { Modal } from "react-bootstrap";
// React Icons for visual elements
import { BiCheckCircle } from "react-icons/bi";
// Static assets (images)
import list from "../assets/img/list.png";
import winner from "../assets/img/winner.png";
import holiday from "../assets/img/holiday.png";
// UserWallet component (assumed to be styled with Tailwind internally)
import UserWallet from "../components/UserWallet";
// Import custom CSS
import "../assets/css/twoD.css";

const TwoDPage = () => {
    // Static times for the modal, removing unused ones
    const times = [
        { id: 2, time: "12:00 PM" },
        { id: 4, time: "04:30 PM" },
    ];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Static user data, replacing API call
    const user = { balance: 9876543, name: "Jane Doe" };

    // Static data for lottery home links
    const lottoHome = [
        { id: 1, title: "မှတ်တမ်း", img: list, link: "/morning-bet-slip" },
        { id: 2, title: "ကံထူးရှင်များ", img: winner, link: "/2d/winners" },
        { id: 3, title: "ပိတ်ရက်", img: holiday, link: "/2d/holiday" },
    ];

    // --- Live 2D Data Integration ---
    const [liveData, setLiveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let intervalId;

      const fetchLiveData = () => {
        fetch("https://api.thaistock2d.com/live")
          .then(res => res.json())
          .then(data => {
            setLiveData(data);
            setLoading(false);
          })
          .catch(err => {
            setError("Failed to load live data");
            setLoading(false);
          });
      };

      fetchLiveData(); // Initial fetch
      intervalId = setInterval(fetchLiveData, 2000); // Fetch every 2 seconds

      return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    // --- End Live 2D Data Integration ---

    const navigate = useNavigate();

    // Removed authentication check useEffect as API is removed.
    // useEffect(() => {
    //   if (!auth) {
    //     navigate("/login");
    //   }
    // }, [auth, navigate]);

    // Static data for modern and internet digits, replacing API calls
    const modern = {
        modern_morningData: { modern_digit: "45" },
        modern_eveningData: { modern_digit: "78" },
    };
    const internet = {
        morningData: { internet_digit: "32" },
        eveningData: { internet_digit: "01" },
    };

    // Loading and error states for live data
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div
          className="min-h-screen bg-gradient-to-br from-teal-300 via-blue-400 to-purple-500 pb-20"
        >
          {/* User Wallet */}
          {/* UserWallet removed as per user request */}

          {/* Lottery Home Navigation */}
          <div className="w-full max-w-md mx-auto flex justify-between gap-2 mb-2 sticky top-16 z-30 bg-gradient-to-br from-teal-200/80 via-blue-200/80 to-purple-200/80 backdrop-blur rounded-b-xl shadow-md">
            {lottoHome.map((item) => (
              <NavLink to={item.link} key={item.id} className="flex-1">
                <div className="flex flex-col items-center p-3 bg-white/80 rounded-xl shadow-md hover:bg-blue-200/60 transition">
                  <img src={item.img} alt={item.title} className="w-8 h-8 mb-1" />
                  <span className="text-xs font-semibold text-gray-800">{item.title}</span>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Current 2D Result Section */}
          <div className="w-full max-w-md mx-auto bg-white/90 rounded-3xl shadow-xl mb-4 p-6 flex flex-col items-center py-8">
            <h1 className="text-7xl font-extrabold text-blue-500 mb-4 drop-shadow">{liveData?.live?.twod ?? "--"}</h1>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <BiCheckCircle className="text-teal-400 text-xl" />
              <span className="text-xs">Updated: {liveData?.live?.date} - {liveData?.live?.time}</span>
            </div>
            <span className="text-xs text-gray-400 mb-4">
              {liveData?.server_time ? `${liveData.server_time} တွင် ထီပိတ်ပါမည်။` : ""}
            </span>

            {/* Previous Results Table */}
            <div className="w-full bg-blue-100/30 rounded-xl p-3 space-y-3">
              {liveData?.result?.map((number, index) => (
                <div key={index} className={`pb-2 ${index !== liveData.result.length - 1 ? 'border-b border-blue-200' : ''}`}> 
                  <div className="text-xs font-bold mb-1">{number.open_time}</div>
                  <div className="grid grid-cols-3 text-center text-xs font-bold text-blue-700">
                    <div>Set</div>
                    <div>Value</div>
                    <div>2D</div>
                  </div>
                  <div className="grid grid-cols-3 text-center text-sm font-semibold">
                    <div>{number.set}</div>
                    <div>{number.value}</div>
                    <div>{number.twod}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern and Internet Digits */}
            <div className="w-full bg-purple-100/30 rounded-xl px-4 py-3 mt-6 space-y-4">
              <div className="flex justify-between items-center border-b border-purple-200 pb-3">
                <span className="text-xs font-bold">9:00 AM</span>
                <div className="text-center">
                  <div className="text-xs text-gray-500">မော်ဒန်</div>
                  <div className="text-lg font-semibold">{modern?.modern_morningData?.modern_digit ?? "-"}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">အင်တာနက်</div>
                  <div className="text-lg font-semibold">{internet?.morningData?.internet_digit ?? "-"}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">2:00 PM</span>
                <div className="text-center">
                  <div className="text-xs text-gray-500">မော်ဒန်</div>
                  <div className="text-lg font-semibold">{modern?.modern_eveningData?.modern_digit ?? "-"}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">အင်တာနက်</div>
                  <div className="text-lg font-semibold">{internet?.eveningData?.internet_digit ?? "-"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Button for Place Bet */}
          {!show && (
            <button
              onClick={handleShow}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg hover:scale-105 active:scale-95 transition-all"
            >
              ထိုးမည်
            </button>
          )}

          {/* Time Selection Modal */}
          <Modal show={show} onHide={handleClose} centered dialogClassName="z-50">
            <Modal.Header closeButton className="!border-b-0">
              <Modal.Title>
                <span className="font-bold text-lg">ထိုးမည့်အချိန် ရွေးပါ။</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4 p-6">
              {/* Updated text above buttons, smaller and less prominent */}
              {liveData?.live?.date && liveData?.live?.time && (
                <div className="flex items-center justify-center text-xs text-gray-500 mb-2 gap-1">
                  <BiCheckCircle className="text-teal-400 text-base" />
                  <span>Updated: {liveData.live.date} - {liveData.live.time}</span>
                </div>
              )}
              {times.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setShow(false);
                    navigate(`/2d/bet?time=${item.id}`);
                  }}
                  className="w-full py-4 mb-2 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-extrabold text-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{ marginBottom: idx === times.length - 1 ? 0 : '1rem' }}
                >
                  {item.time}
                </button>
              ))}
            </Modal.Body>
          </Modal>
        </div>
      );
};

export default TwoDPage;
