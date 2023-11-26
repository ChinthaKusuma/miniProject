import {Component} from 'react'
import './index.css'

class DistrictsData extends Component {
  returnDistrict = each => {
    const {name, value} = each

    return (
      <div className="top-districts">
        <h1>{value}</h1>
        <p className="para_name">{name}</p>
      </div>
    )
  }

  getDistricts = () => {
    const {listStats, active} = this.props
    const {districts} = listStats
    const distNames = Object.keys(districts)
    let dataElement = null
    if (active === 'active1') {
      dataElement = distNames.map(each => ({
        name: each,
        // confirmed: districts[each].total.confirmed,
        // recovered: districts[each].total.recovered,
        // deceased: districts[each].total.deceased,
        value:
          districts[each].total.confirmed -
          districts[each].total.recovered -
          districts[each].total.deceased,
      }))
    } else {
      dataElement = distNames.map(each => ({
        name: each,
        value: districts[each].total[active],
      }))
    }
    const sort1 = dataElement.sort((a, b) => (a.value > b.value ? -1 : 1))

    return (
      <div className="districts">
        {sort1.map(each => this.returnDistrict(each))}
      </div>
    )
  }

  render() {
    return <div className="districts1">{this.getDistricts()}</div>
  }
}
export default DistrictsData
