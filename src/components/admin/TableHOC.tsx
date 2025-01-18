import {useTable,Column,TableOptions,useSortBy,usePagination} from "react-table";
import {AiOutlineSortAscending,AiOutlineSortDescending} from "react-icons/ai";
const TableHOC=<T extends Object>(columns:Column<T>[],data:T[],containerClassname:string,heading:string
    ,showPagination=false)=>{
   return(
    function HOC(){
        const options:TableOptions<T>={
            columns,data,
            initialState:{
                pageSize:6,
            }
        };
        const {getTableProps,getTableBodyProps,headerGroups,page,prepareRow,
            nextPage,previousPage,canNextPage,canPreviousPage,pageCount,state:{pageIndex}
        }=useTable(options,useSortBy,usePagination);
        return (
            <div className={containerClassname}>
                <h2 className="heading">{heading}</h2>
                <table className="table" {...getTableProps()}>
                    <thead >
                        {
                            headerGroups.map(headerGroup=>{
                                return ( 
                                    <tr {...headerGroup.getHeaderGroupProps()}>

                                        {
                                            headerGroup.headers.map((column)=>(
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render("Header")}
                                                    <span>{" "}{column.isSorted && (column.isSortedDesc? <AiOutlineSortDescending /> : <AiOutlineSortAscending/>)}</span> 
                                                </th>
                                            ))
                                        }
                                    </tr>
                                )
                            })
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row=>{
                                prepareRow(row);
                                return (<tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell=>(
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))
                                }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                {
                    showPagination ? <div className={"table-pagination"}> <button className="prev" disabled={!canPreviousPage} onClick={previousPage}>prev</button>
                     <span>{`${pageIndex+1} of ${pageCount} `}</span>
                     <button className="next" onClick={nextPage} disabled={!canNextPage}>next</button></div>:null
                }
            </div>
        )
    }
   )
}
export default TableHOC;