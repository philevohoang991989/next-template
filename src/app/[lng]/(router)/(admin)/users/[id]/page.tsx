import styles from './styles.module.scss'
const DetailUserPage = (props: any)=>{
    console.log(">>> check props: " , props);
    const {params} = props
    return(
        <section className={styles.wrapperPage}>
            <span>abc</span> 
            id = {params?.id}
        </section>
    )
}
export default DetailUserPage