import React from 'react';
import { getTasksTextWithHighlightedKeyword } from 'layouts/Jobs/taskAndType';
import styles from './IITB.module.css'; // Importing the module

export default function IITB() {
  const tasks = [
    {
      text: '• Developed AffectBots: A web-based tutoring system using multimodal analysis (audio, video, text) to analyze 100+ hours of student engagement data with 88% accuracy in emotion recognition.',
      keywords: ['TensorFlow'],
    },
    {
      text: '• Implemented speaker diarization using PyAnnote and Whisper Speech Recognition model for Indo-English collaborative learning environments, analyzing 140+ hours of student interactions.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
    {
      text: '• Outperformed existing speaker diarization models by 65% on a 200-hour benchmark dataset of classroom recordings.',
      keywords: ['Django'],
    },
    {
      text: '• Research on improved diarization pipeline accepted at IEEE TALE 2024, focusing on its impact on understanding collaborative learning dynamics.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
    {
      text: '• Applied Conditional Random Fields (CRFs) and machine learning to identify triggers of Socially Shared Metacognitive Regulation (SSMR) episodes in collaborative learning.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
    {
      text: '• Developed an automated analysis system for large-scale collaborative learning datasets, with findings accepted for publication at EdTech Society T4E 2024.',
      keywords: ['PyTorch, PyAnnote, OpenCV'],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>
        Research Associate <span className={styles.company}>- Dept of Educational Technology</span>
        </span>
        <span className={styles.date}>May 2023 - September 2024</span>
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
