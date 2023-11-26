import {Component} from 'react'
import Loader from 'react-loader-spinner'
import DistrictsData from '../DistrictsData'
import Barchart from '../Barchart'

import IndianStats from '../IndianStats'
import Header from '../Header'
import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'INPROGRESS',
}
const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]
class SpecificStateDetails extends Component {
  state = {
    api: '',
    listState: [],
    stateName: '',
    active: 'confirmed',
  }

  componentDidMount() {
    this.getSpecificStateDetails()
  }

  getSpecificStateDetails = async () => {
    this.setState({
      api: apiStatus.inProgress,
    })
    const {match} = this.props

    const {params} = match
    // console.log(params)
    const {stateCode} = params
    const stateName = statesList.find(each => each.state_code === stateCode)

    const url = `https://apis.ccbp.in/covid19-state-wise-data/`
    const response = await fetch(url)

    const data = await response.json()
    console.log(data[stateCode])
    // const stateCode1 = data[stateCode]
    // console.log(stateCode1)

    const updatedData = {
      stateName: stateName.state_name,
      stateCode,
      meta: {
        lastUpdated: data[stateCode].meta.last_updated,
        date: data[stateCode].meta.date,
      },
      total: {
        tested: data[stateCode].total.tested,
        recovered: data[stateCode].total.recovered,
        confirmed: data[stateCode].total.confirmed,
        deceased: data[stateCode].total.deceased,
      },
      districts: data[stateCode].districts,
    }

    // console.log(updatedData.districts)
    const districtsList = updatedData.districts

    if (response.ok === true) {
      this.setState({
        api: apiStatus.success,
        listState: updatedData,
        stateName: stateName.state_name,
      })
    }
  }

  renderData = () => {
    const {api} = this.state

    switch (api) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  getActive = status => {
    this.setState({
      active: status,
    })
  }

  renderSuccess = () => {
    const {stateName, listState, active} = this.state

    const {meta, total} = listState
    // console.log(listState.stateCode)

    const {lastUpdated} = meta
    const {tested} = total

    const date1 = new Date(lastUpdated)

    return (
      <>
        <div className="state_name_con">
          <div>
            <div className="state-name">
              <p>{stateName}</p>
            </div>
            <p className="para1">{`Last Update on ${date1}`}</p>
          </div>
          <div className="con2">
            <p>Tested</p>
            <p>{tested}</p>
          </div>
        </div>
        <IndianStats
          listStats={listState}
          statesList={statesList}
          getActive={this.getActive}
        />
        <h1 className="heading_top_districts">Top Districts</h1>
        <div className="districts1">
          <DistrictsData listStats={listState} active={active} />
        </div>
        <Barchart code={listState.stateCode} />
      </>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="Oval" color="white" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <div className="Home_Container">
        <Header />
        <div className="Home_Container1">{this.renderData()}</div>
      </div>
    )
  }
}
export default SpecificStateDetails
