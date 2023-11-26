import {Component, React} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const data = [
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 100},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 300},
  {date: '23-02-2017', count: 200},
  {date: '24-02-2017', count: 400},
  {date: '23-02-2017', count: 600},
]

class Barchart extends Component {
  state = {listBar: []}

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {code} = this.props
    const url = `https://apis.ccbp.in/covid19-timelines-data/${code}`
    const response = await fetch(url)
    const data1 = await response.json()

    const specific = data1[code].dates
    console.log(specific)
    const keys = Object.keys(specific)
    const sortedKeys = keys.sort((a, b) => (a > b ? -1 : 1))
    const range = sortedKeys.slice(1, 11)
    console.log(sortedKeys)
    console.log(keys)
    if (response.ok === true) {
      const data2 = range.map(each => ({
        date: each,
        count: specific[each].total.confirmed,
      }))
      console.log(data1)
      this.setState({
        listBar: data2,
      })
    }
  }

  getBarchart = () => {
    const {listBar} = this.state
    // console.log(listBar)
    return (
      <>
        <h1>one</h1>
        <div>
          <BarChart width={800} height={450} data={listBar}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#8884d8"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
        {/* <div>
          <h1>Line Chart</h1>
          <div className="App">
            <LineChart
              width={730}
              height={250}
              data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </div>
        </div> */}
      </>
    )
  }

  render() {
    return <>{this.getBarchart()}</>
  }
}
export default Barchart
