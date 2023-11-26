import {Component} from 'react'
import './index.css'
import {BsFilterLeft, BsFilterRight} from 'react-icons/bs'
import EachStats from '../EachStats'

class AllStatsHomeData extends Component {
  state = {statesData: {}}

  componentDidMount() {
    this.getStatedData()
  }

  getStatedData = () => {
    // const {statesData} = this.state
    const {listStats, statesList} = this.props
    const statesData1 = statesList.map(eachState => ({
      stateName: eachState.state_name,
      stateCode: eachState.state_code,
      confirmed: Object.keys(listStats)
        .filter(state => state === eachState.state_code)
        .map(each => listStats[each].total.confirmed),
      recovered: Object.keys(listStats)
        .filter(state => state === eachState.state_code)
        .map(each => listStats[each].total.recovered),
      deceased: Object.keys(listStats)
        .filter(state => state === eachState.state_code)
        .map(each => listStats[each].total.deceased),

      population: Object.keys(listStats)
        .filter(state => state === eachState.state_code)
        .map(each => listStats[each].meta.population),
    }))

    this.setState({
      statesData: statesData1,
    })
  }

  getAscending1 = () => {
    const {statesData} = this.state
    const sortedData = statesData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
    )
    this.setState({
      statesData: sortedData,
    })
  }

  getDescending1 = () => {
    const {statesData} = this.state
    const sortedData = statesData.sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )

    this.setState({
      statesData: sortedData,
    })
  }

  render() {
    const {statesData} = this.state
    return (
      <div className="table_container">
        <ul className="row_container">
          <div className="asc_desc cell_container2">
            <li>States/Ut</li>
            <button
              className="asc_button"
              type="button"
              onClick={this.getAscending1}
            >
              {/* <h1>one</h1> */}
              <BsFilterLeft className="icon1" />
            </button>
            <button
              className="asc_button"
              type="button"
              onClick={this.getDescending1}
            >
              {/* <h1>one</h1> */}
              <BsFilterRight className="icon1" />
            </button>
          </div>
          <li className="cell_container1">Confirmed</li>
          <li className="cell_container1">Active</li>
          <li className="cell_container1">Recovered</li>
          <li className="cell_container1">Deceased</li>
          <li className="cell_container1">Population</li>
        </ul>
        <hr />

        {statesData.length && (
          <>
            {statesData.map(each => (
              <EachStats item={each} />
            ))}
          </>
        )}
      </div>
    )
  }
}
export default AllStatsHomeData
