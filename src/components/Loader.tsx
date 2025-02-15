const Loader=()=>{
    return(
        <section className="loader">
            <div></div>
        </section>
    )
};
type SkeletonProps = {
    width?:string;
    length?:number;
}

export const SkeletonLoader =({width = "unset", length=3} :SkeletonProps)=>{
    const skeletons = Array.from({length},(_, ind)=>(
        <div key={ind} className="skeleton-shape"></div>
    ))
    return(
        <div className="skeleton-loader" style={{width}}>
            {
                skeletons
            }
        </div>
    )
}

export default Loader;