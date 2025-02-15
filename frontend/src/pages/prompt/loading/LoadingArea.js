// src/components/loading/LoadingArea.js
import React from "react";
import styles from "./LoadingArea.module.scss";

const LoadingArea = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        {/* You can add a spinner or other loading indicators here */}
      </div>
    </div>
  );
};

export default LoadingArea;
