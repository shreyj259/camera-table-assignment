import SearchBox from "../../../components/searchBox"
import './titlebar.css'

const TitleBar = ({setSearchQuery}:{ setSearchQuery: (query: string) => void}) => {
  return (
    <div className="flex title-bar">
        <div className="title-container">
            <h1 className="title">Cameras</h1>
            <div className="subtitle">Manage your cameras here.</div>
        </div>

        <div>
            <SearchBox setSearchQuery={setSearchQuery}/>
        </div>
    </div>
  )
}

export default TitleBar