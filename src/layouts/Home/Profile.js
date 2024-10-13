import profileImgPlaceholder from 'assets/profile-placeholder.jpg';

import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';
import myImage from 'assets/proff.jpg';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
  I&apos;m Aarsh, a driven Data Science and AI student at{' '}
  <Link href="https://iiitdwd.ac.in/">Indian Institute of Information Technology Dharwad</Link>, 
  passionate about machine learning, computer vision, and NLP. With a strong academic background 
  and diverse research experience, I&apos;ve tackled projects ranging from speaker diarization 
  to energy-efficient 3D CNN architectures for lung cancer nodule analysis.
</Text>
<Text className={styles.description} data-visible={visible} size="l" as="p">
  I&apos;ve contributed to <span style={{ fontWeight: 'bold' }}>two research papers</span>, 
  accepted at <span style={{ fontWeight: 'bold' }}>IEEE TALE 2024</span> and{' '}
  <span style={{ fontWeight: 'bold' }}>T4E 2024</span>, showcasing my work on collaborative 
  learning environments and socially shared metacognitive regulation. As{' '}
  <span style={{ fontWeight: 'bold' }}>President of the Data Science and AI Society</span>, 
  I&apos;ve led initiatives fostering innovation and knowledge sharing.
</Text>
<Text className={styles.description} data-visible={visible} size="l" as="p">
  Proficient in Python, TensorFlow, PyTorch, and various big data technologies, I&apos;m adept 
  at developing AI solutions and optimizing deep learning models. I&apos;m always eager to apply 
  my skills to real-world challenges, pushing the boundaries of AI and data science while 
  maintaining a keen focus on energy efficiency and practical applications.
</Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[myImage, myImage]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  {/* <use href={`${profileKatakana}#katakana-profile`} /> */}
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
