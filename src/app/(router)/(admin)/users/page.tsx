"use client";
import User from "@/app/components/User";
import { Iuser } from "@/types/user";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";


function PageUser() {
  const [userInfo, setUserInfo] = useState<Iuser>();

  useEffect(() => {
    axiosInstance.get("/user/me").then((res) => {
      
      const { data } = res;
      setUserInfo(data);
    });
  }, []);

  return (
    <section>
      <User users={userInfo} />
    </section>
  );
}
export default PageUser;
