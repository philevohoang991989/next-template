"use client";
import User from "@/app/components/User";
import { Iuser } from "@/types/user";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { Button } from "antd";

function PageUser() {
  const [userInfo, setUserInfo] = useState<Iuser>();

  useEffect(() => {
    axiosInstance.get("/user/me").then((res) => {
      
      const { data } = res;
      setUserInfo(data);
    });
  }, []);

  return (
    <section className={styles.wapperPage}>
      <h1>asdasdasdas</h1>
      <User users={userInfo} />
      <Button type="primary">sdsd</Button>
    </section>
  );
}
export default PageUser;
