import styles from "./completed.module.css";

export const Completed = ({ title, value }) => {
  return (
    <div className={styles.container}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <p className={`text text_type_digits-large ${styles.value}`}>{value}</p>
    </div>
  );
};

export default Completed;
