import Filters from "../../components/filterBar"
import PaginationControls from "../../components/paginationComponent"
import { CameraListItem } from "../../components/tableComponent/CameraTableItem"
import { TableHeader } from "../../components/tableComponent/TableHeader"
import { useFilteredData } from "../../utils/useFilteredData"
import TitleBar from "./titleBar"

const Dashboard = () => {
    const {data,setCurrentPage,currentPage,setLocation,totalItems,setPageSize,setSearchQuery,setStatus,deleteItem,updateActiveStatus}=useFilteredData({})
    console.log(data)

  return (
    <div>
        <TitleBar setSearchQuery={setSearchQuery} />
        <Filters setLocation={setLocation} setStatus={setStatus} />
        <TableHeader />
        {
          data?.map((item:any)=>{
            return <CameraListItem id={item.id} current_status={item.current_status} key={item.id} name={item.name} hasWarning={item.hasWarning} activeStatus={item.status} onActionClick={()=>deleteItem(item.id)} updateActiveStatus={updateActiveStatus} taskCount={item.tasks} recorderName={item.recorder} location={item.location}  />
          })
        }
        <PaginationControls currentPage={currentPage} onPageChange={setCurrentPage} onItemsPerPageChange={setPageSize} totalItems={totalItems}  />
    </div>
  )
}

export default Dashboard