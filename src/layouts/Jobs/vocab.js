import React from 'react';
// import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from 'layouts/Jobs/taskAndType';
import styles from './IITB.module.css'; // Importing the module

export default function Vocab() {
  const tasks = [
    {
      text: '• Built a full-stack data pipeline processing 100,000 customer service conversations from Google Business APIs with a 98% success rate.',
      keywords: ['Alchemy', 'Wagmi', 'Web3.js', 'Moralis', 'Ethers.js'],
    },
    {
      text: '• Created a web UI for analyzing transcripts and displaying 10 key metrics, including response time and customer satisfaction scores.',
      keywords: ['quality', 'testing tasks', 'user base'],
    },
    {
      text: '• Fine-tuned Meta LLaMA 2 and OpenAI GPT-3.5 Turbo using LangChain for sentiment analysis, topic modeling, and conversation scoring.',
      keywords: ['quality', 'testing tasks', 'user base'],
    },
    {
      text: '• Improved model accuracy by 8% through hyperparameter tuning and data augmentation techniques.',
      keywords: ['quality', 'testing tasks', 'user base'],
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          {/* Title */}
          <span className={styles.title}>
          MLOps Intern <span className={styles.company}>- Vocab.Ai</span>
          </span>
          {/* Date */}
          <span className={styles.date}>August 2023 - August 2024</span>
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
