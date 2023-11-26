import './index.css'

export default function Header() {
  return (
    <div className="header_container">
      {/* <h1>Header</h1> */}
      <img
        src="https://res.cloudinary.com/dpzv5lbqa/image/upload/v1700648591/COVID19INDIAlogo_1_plye5x.png"
        className="website_logo_image"
        alt="website logo"
      />
      <ul className="unordered_list">
        <li className="list_item">Home</li>
        <li className="list_item">About</li>
      </ul>
    </div>
  )
}
