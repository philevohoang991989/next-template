"use client";
import axiosInstance from "@/utils/axios";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useRouter } from "next/navigation";
import Upload, { RcFile } from "antd/es/upload";
import { AnyObject } from "antd/es/_util/type";

function PageRequestOcr() {
  const [listTemplate, setListTemplate] = useState();
  const [fileList, setFileList] = useState<any>([]);
  const [form] = Form.useForm();
  const router = useRouter();
  useEffect(() => {
    axiosInstance.get("/template/compact").then((res) => {
      const { data } = res;
      if (data?.length > 0) {
        const dataRs: any = [];
        data?.map((item: any) => {
          dataRs.push({
            label: item.name,
            value: item.id,
          });
        });
        setListTemplate(dataRs);
      }
    });
  }, []);
  useEffect(() => {
    console.log({fileList});
    
    if (fileList.length > 10) {
        console.log('do day');
        
      message.error("You can only upload up to 10 files.");
    }
  }, [fileList]);
  const createOCRRequest = () => {
    console.log();
  };
//   console.log({ fileList });
  const deleteItem = (fileDelete: any)=>{
    const newItem = fileList.filter((item: any)=> item !== fileDelete);
    setFileList(newItem)
   
    
  }
  return (
    <section className={styles.wapperPage}>
      <Form
        className={styles.formCreate}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={createOCRRequest}
        form={form}
        autoComplete="off"
      >
        <Row gutter={[16, 0]} className={styles.rowForm}>
          <Col span={24} lg={10}>
            <Form.Item
              label="Title"
              name="name"
              className={styles.formInput}
              rules={[
                {
                  required: true,
                  message: "This is required field!",
                },
              ]}
            >
              <Input className={styles.inputForm} style={{ height: 44 }} />
            </Form.Item>
          </Col>
          <Col span={24} lg={7}>
            <Form.Item
              label="Template"
              name="template"
              className={styles.formInput}
              rules={[
                {
                  required: true,
                  message: "This is required field!",
                },
              ]}
            >
              <Select
                style={{ height: 44 }}
                allowClear
                options={listTemplate}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={7}>
            <div className={styles.wrapBtnAddNewTemplate}>
              <Button
                type="link"
                className={styles.btnAddNewTemplate}
                onClick={() => router.push("/users")}
                icon={<PlusOutlined />}
              >
                Add New Template
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item
              name="file"
              label="Documents"
              rules={[
                {
                  required: true,
                  message: "This is required field!",
                },
              ]}
              className={styles.boxUpload}
            >
              <Upload
                multiple
                listType="picture"
                accept=".png, .jpg,.jpeg,.pdf"
                showUploadList={false}
                beforeUpload={(file) => {
                  // You can perform checks on the file before uploading
                  console.log("File size:", file.size); // Access file size here

                  // Check the maximum count of files

                  // Continue with the upload if the count is within the limit
                  return false;
                }}
                onChange={(info) => {
                    setFileList(info?.fileList);
                }}
                fileList={fileList}
               
                defaultFileList={[
                  {
                    uid: "demo",
                    name: "demo.png",
                    status: "uploading",
                    percent: 50,
                    url: "https://www.google.com",
                  },
                ]}
                maxCount={10}
                // iconRender={() => {
                //   return <Spin />;
                // }}
              >
                <Button>Click to Upload</Button>
              </Upload>
              
            </Form.Item>
            <div className={styles.listFile}>
            {fileList.map((item:any)=>{
                return <div key={item.name} className={styles.itemList}>
                    <span>{item.name}</span> <span>{(item.size / 1024 / 1024).toFixed(2)}M </span> <Button onClick={()=>{deleteItem(item)}}>delete</Button>
                </div>
              })}
              </div>
          </Col>
        </Row>
      </Form>
    </section>
  );
}
export default PageRequestOcr;
