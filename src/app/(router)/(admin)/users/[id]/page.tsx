const DetailUserPage = (props: any)=>{
    console.log(">>> check props: " , props);
    const {params} = props
    return(
        <div>
            abc
            id = {params?.id}
        </div>
    )
}
export default DetailUserPage