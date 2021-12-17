import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';

import BaseLayout from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';

const roles = [
  'Javascript',
  'React JS',
  'Node',
  'Java',
  'Java Spring',
  'Angular',
  'MongoDB',
  'mySQL',
];

const Index = props => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, error, loading } = useGetUser();
  const flipInterval = useRef();

  useEffect(() => {
    animateCard();
    return () => clearInterval(flipInterval.current);
  }, []);
  const animateCard = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping(prevValue => !prevValue);
    }, 3000);
  };

  return (
    <BaseLayout
      user={data}
      loading={loading}
      className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}
      navClass='transparent'
    >
      <div className='main-section'>
        <div className='background-image'>
          <img src='/images/background-index.png' />
        </div>
        <Container>
          <Row>
            <Col md='6'>
              <div className='hero-section'>
                <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                  <div className='front'>
                    <div className='hero-section-content'>
                      <h2> Full Stack Web Developer </h2>
                      <div className='hero-section-content-intro'>
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className='image' src='/images/section-1.png' />
                    <div className='shadow-custom'>
                      <div className='shadow-inner'> </div>
                    </div>
                  </div>
                  <div className='back'>
                    <div className='hero-section-content'>
                      <h2> Full Stack Web Developer </h2>
                      <div className='hero-section-content-intro'>
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className='image' src='/images/section-2.png' />
                    <div className='shadow-custom-orange'>
                      <div className='shadow-inner'> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md='6' className='hero-welcome-wrapper'>
              <div className='hero-welcome-text'>
                <h1>
                  Welcome to the portfolio website of Andrew Persaud. Discover
                  projects I was working on through the years!
                </h1>
              </div>
              <Typed
                loop
                typeSpeed={70}
                backSpeed={90}
                strings={roles}
                backDelay={1000}
                loopCount={0}
                showCursor
                className='self-typed'
                cursorChar='|'
              />
              <div className='hero-welcome-bio'>
                <h1>Let's take a look at my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Index;
