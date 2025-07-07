import React, { useContext } from 'react'
import Marquee from '../components/mobile/Marquee'
import LanguageDropdown from '../components/LanguageDropdown'
import { LanguageContext } from '../contexts/LanguageContext'
import { GeneralContext } from '../contexts/GeneralContext'

const Promotion = () => {
  const { content } = useContext(LanguageContext);
  const { promotions } = useContext(GeneralContext);

  return (<>
    <div className="d-flex align-items-center bg-black">
      <Marquee />
      {/* <LanguageDropdown /> */}
    </div>
    <div className='py-4 px-3 px-sm-5 mx-lg-5 mb-2'>
      <h4 className="fw-bold text-center mb-3">{content?.nav?.promotion}</h4>
      <div className="row">
        {promotions && promotions.map((item, index) => (
          <div className='col-md-12 mb-4' key={index}>
            <div className='py-3 rounded border '>
              <h4 className='ms-4 mb-0 text-center'>{item.title}</h4>
              <div className='d-flex justify-content-center'>
                <img src={ "https://luckymillion.pro/api/.."+item.img_url} className='my-2   img-fluid' />
              </div>
              <p className='mx-4 text-center'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default Promotion
