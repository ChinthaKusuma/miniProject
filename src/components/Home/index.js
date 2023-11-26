import {Component} from 'react'
import {IoSearchOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import IndianStats from '../IndianStats'
import AllStatsHomeData from '../AllStatsHomeData'
import Footer from '../Footer'
import SearchData from '../SearchData'
import './index.css'

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

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Home extends Component {
  state = {api: '', listStats: '', searchInput: ''}

  componentDidMount() {
    this.getIndianStatsData()
  }

  getIndianStatsData = async () => {
    this.setState({
      api: apiStatus.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    // const updatedData = data.map(each => ({

    // }))
    // console.log(updatedData)
    if (response.ok === true) {
      this.setState({
        api: apiStatus.success,
        listStats: data,
      })
    }
    // console.log(data)
  }

  renderSuccess = () => {
    const {listStats, searchInput} = this.state
    return (
      <>
        {searchInput === '' ? (
          <div>
            <IndianStats listStats={listStats} statesList={statesList} />
            <div className="all_states_data_container">
              <AllStatsHomeData listStats={listStats} statesList={statesList} />
            </div>
          </div>
        ) : (
          <>
            <SearchData searchInput={searchInput} statesList={statesList} />
          </>
        )}
      </>
    )
  }

  renderProgress = () => (
    <div className="loader">
      <Loader type="Oval" color="white" height={50} width={50} />
    </div>
  )

  getChangeInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderIndianStatsData = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.inProgress:
        return this.renderProgress()
      case apiStatus.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Home_Container">
        <Header />
        <div className="search_container">
          <div>
            <IoSearchOutline className="search_icon" />
            <input
              type="text"
              placeholder="Enter Search"
              className="input"
              onChange={this.getChangeInput}
            />
          </div>
        </div>

        {this.renderIndianStatsData()}
        <div className="footer1">
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home
