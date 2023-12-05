// 'use client'
import { Iuser } from "@/types/user";
import axiosInstance from "@/utils/axios";
import { useEffect } from "react"

interface IProps{
    users: Iuser | undefined
}
const User = (props:IProps) => {
    const {users} = props
    console.log({users});
    
    // useEffect(()=>{
    //     const response =  axiosInstance.get('/user/me');
    //     console.log({response});
    // },[])
    return(<section>{users?.email}</section>)
}
export default User