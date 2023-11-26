import {BsGithub} from 'react-icons/bs'
import {IoLogoInstagram} from 'react-icons/io5'

import {FiTwitter} from 'react-icons/fi'
import './index.css'

export default function Footer() {
  return (
    <div className="footer_container">
      <img
        src="https://res.cloudinary.com/dpzv5lbqa/image/upload/v1700648591/COVID19INDIAlogo_1_plye5x.png"
        className="website_logo_image1"
        alt="website logo"
      />
      <p>we stand with everyone fighting on the front lines</p>
      <div>
        <BsGithub className="git_icon" />
        <IoLogoInstagram className="git_icon" />
        <FiTwitter className="git_icon" />
      </div>
    </div>
  )
}
