import React from 'react';
// import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from 'layouts/Jobs/taskAndType';
import styles from './IITB.module.css'; // Importing the module

export default function EnsVision() {
  const tasks = [
    {
      text: '• Developed a full-stack web application leveraging machine learning and live market data to generate real-time swing trade signals, improving efficiency and accuracy.',
      keywords: ['Alchemy', 'Wagmi', 'Web3.js', 'Moralis', 'Ethers.js'],
    },
    {
      text: '• Deployed machine learning models leveraging multimodal data (news, public, macro, market) for improved trading predictions (76% P/L Ratio) and integrated REST APIs and backend services for data aggregation, model deployment, and real-time analytics.',
      keywords: ['quality', 'testing tasks', 'user base'],
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          {/* Title */}
          <span className={styles.title}>
          Research Intern <span className={styles.company}>- Robert Bosch Centre for Data Science and AI</span>
          </span>
          {/* Date */}
          <span className={styles.date}>Jun 2024 - Present</span>
        </div>
        <div className={styles.taskList}>
          {/* Tasks Description 1 */}
          {tasks.map((item, index) => {
            return (
              <div key={index} className={styles.taskItem}>
                {/* <ArrowIcon className={" h-5 w-4 text-AAsecondary flex-none"} /> */}
                <span
                  className={styles.taskText}
                  dangerouslySetInnerHTML={{
                    __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
                  }}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
