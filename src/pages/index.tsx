import type { NextPage } from "next";
import Header from "../components/Header";
import Main from "../components/Main";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.maxContainer}>
      <div className={styles.container}>
        <Main />
      </div>
    </div>
  );
};

export default Home;
