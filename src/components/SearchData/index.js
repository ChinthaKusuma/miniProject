import EachSearchState from '../EachSearchState'
import './index.css'

const SearchData = props => {
  const {searchInput, statesList} = props
  //   console.log(statesList)
  const searchList = statesList.filter(each =>
    each.state_code.toLowerCase().includes(searchInput.toLowerCase()),
  )
  const searchModifyData = searchList.map(each => ({
    stateName: each.state_name,
    stateCode: each.state_code,
  }))

  return (
    <div>
      <>
        {searchModifyData.map(eachState => (
          <EachSearchState item={eachState} key={eachState.stateCode} />
        ))}
      </>
    </div>
  )
}
export default SearchData
