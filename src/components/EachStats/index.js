import './index.css'

const EachStats = props => {
  const {item} = props
  const {stateName, confirmed, recovered, deceased, population} = item
  const active = confirmed - recovered - deceased
  return (
    <ul className="row_container">
      <li className="cell_container2">{stateName}</li>
      <li className="cell_container1 color1">{confirmed}</li>
      <li className="cell_container1 color2">{active}</li>
      <li className="cell_container1 color3">{recovered}</li>
      <li className="cell_container1 color4">{deceased}</li>
      <li className="cell_container1 color4">{population}</li>
    </ul>
  )
}
export default EachStats
