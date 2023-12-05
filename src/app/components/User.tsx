import { Iuser } from "@/types/user";
interface IProps{
    users: Iuser | undefined
}
const User = (props:IProps) => {
    const {users} = props
    return(<section>{users?.email}</section>)
}
export default User