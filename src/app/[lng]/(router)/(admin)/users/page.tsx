"use client";
import User from "@/app/components/User";
import { Iuser } from "@/types/user";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { Button } from "antd";
import { useTranslation } from '@/app/i18n'

 function PageUser({ params: { lng} }: any) {
  const [userInfo, setUserInfo] = useState<Iuser>();
  const { t } = useTranslation(lng,'client-page' );
  useEffect(() => {
    axiosInstance.get("/user/me").then((res) => {
      
      const { data } = res;
      setUserInfo(data);
    });
  }, []);

  return (
    <section className={styles.wapperPage}>
      {/* <h1>{t('title')}</h1> */}
      <User users={userInfo} />
      <Button type="primary">sdsd</Button>
      {t('title')}
    </section>
  );
}
export default PageUser;
