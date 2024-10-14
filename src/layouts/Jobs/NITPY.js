import React from 'react';
import { getTasksTextWithHighlightedKeyword } from 'layouts/Jobs/taskAndType';
import styles from './IITB.module.css'; // Importing the module

export default function NITPY() {
  const tasks = [
    {
      text: '• Designed deep learning models with 77% higher energy efficiency on the LIDC-IDRI dataset, maintaining accuracy in classification and segmentation.',
      keywords: ['TensorFlow'],
    },
    {
      text: '• Implemented automated training and testing procedures to ensure reproducible results.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
    {
      text: '• Applied model optimizations like pruning and quantization to reduce memory and computational requirements.',
      keywords: ['Django'],
    },
    {
      text: '• Submitted research findings for publication in MICCAI 2024 proceedings under the E2MIP challenge, focusing on the impact of optimizations on model performance and resource usage.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>
        Research Intern <span className={styles.company}>- Dept of CSE</span>
        </span>
        <span className={styles.date}>December 2023 - January 2024</span>
      </div>
      <div className={styles.taskList}>
        {tasks.map((item, index) => (
          <div key={index} className={styles.taskItem}>
            <span
              className={styles.taskText}
              dangerouslySetInnerHTML={{
                __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}
