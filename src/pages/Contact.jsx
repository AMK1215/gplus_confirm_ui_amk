import React, { useContext } from 'react'
import logo from '../assets/img/logo.png'
import tele from '../assets/img/tele.png'
import viber from '../assets/img/viber.png'
import fb from '../assets/img/fb.png'
import line from '../assets/img/line.webp'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseUrl'
import Marquee from '../components/mobile/Marquee'
import LanguageDropdown from '../components/LanguageDropdown'

const ContactPage = () => {
  const { content } = useContext(LanguageContext);
  const socials = [
    { img: tele, title: 'Telegram', link: '/' },
    { img: viber, title: 'Viber', link: '/' },
    { img: fb, title: 'Facebook', link: '/' },
    { img: line, title: 'Line', link: '/' },
  ]

  const { data } = useFetch(BASE_URL + "/contact");

  const contacts = data?.map((contact) => ({
    ...contact, // Copy existing object properties
    image: contact.name === "Viber"
      ? viber
      : contact.name === "Telegram"
        ? tele
        : contact.name === "Facebook"
          ? fb
          : null, // Default to null if no condition matches
  }));
  // console.log(contacts);


  return (
    <>
      <div className="d-flex align-items-center bg-black">
        <Marquee />
        {/* <LanguageDropdown /> */}
      </div>
      <div className='py-2 px-3 px-sm-5 mb-1 '>
        <h4 className="fw-bold text-center mb-3">{content?.nav?.contact}</h4>
        <div className="mx-auto d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-center gap-sm-4 rounded-4 border shadow-lg py-2 px-4 px-lg-5 my-3 text-white">
          <img src={'./images/your_name_logo.png'} width='160px' />
          <div>
            <small className='fw-bold '>{content?.contact?.welcome}</small>
            <small className='d-block mt-2 fw-bold'>{content?.contact?.service}</small>
          </div>
        </div>
        <div className="row mt-sm-5 justify-content-center">
          {data && data.map((item, index) => {
            return <div className='col-6 mb-4 col-sm-3 text-center' key={index}>
              <Link to={item.value} target='_blank'>
                <img src={"https://luckymillion.pro/api/.."+item.image} className='rounded-2' width={30} />
                <small className='d-block mt-2'>{item.name}</small>
              </Link>
            </div>
          })}
        </div>
      </div>
    </>

  )
}

export default ContactPage
