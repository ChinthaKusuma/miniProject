import {Link} from 'react-router-dom'
import {AiOutlineRightSquare} from 'react-icons/ai'
import './index.css'

const EachSearchState = props => {
  const {item} = props

  const {stateName, stateCode} = item

  return (
    <Link to={`/specific-state/${stateCode}`}>
      <div className="container11">
        <div className="each_state_search_container">
          <p>{stateName}</p>
          <div className="forward_button_container">
            <p className="text">{stateCode}</p>
            <AiOutlineRightSquare className="icon_button" />
          </div>
        </div>
      </div>
    </Link>
  )
}
export default EachSearchState
