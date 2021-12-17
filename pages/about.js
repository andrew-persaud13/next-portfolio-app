import { useEffect } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import { Row, Col } from 'reactstrap';

const About = () => {
  const { data, loading } = useGetUser();

  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    };
  });

  const createFadeInClass = () => {
    if (typeof window !== 'undefined') {
      return window.__isAboutLoaded ? '' : 'fadein';
    }

    return 'fadein';
  };

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage className='about-page'>
        <Row className='mt-5'>
          <Col md='6'>
            <div className='left-side'>
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>
                To About Page
              </h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md='6'>
            <div className={`${createFadeInClass()}`}>
              <p>
                My name is Andrew Persaud. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Omnis eligendi corporis
                accusantium nihil aliquid saepe vel obcaecati. Alias et magnam
                esse ad tempore debitis ratione possimus sapiente. Fuga, quis
                vitae.
              </p>
              <p>
                BENG ENGINEERING Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Aliquam, exercitationem ratione? Qui veritatis
                quas in nemo temporibus doloremque, aliquid, reiciendis officiis
                ab illo quam adipisci consectetur ad totam neque minus! Et
                repellat consequatur ratione numquam exercitationem. Harum
                voluptas voluptate quam, sed corporis, ipsum iste incidunt
                perferendis, nam pariatur quo temporibus necessitatibus officia
                hic suscipit assumenda dolore! Dicta esse at beatae.
              </p>
              <p>
                TODO Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quis perferendis iure quam dolores sit voluptas ducimus
                inventore consectetur repellendus nesciunt a iste quas maxime
                saepe, aspernatur soluta. Saepe, ab vitae. Minima velit numquam
                exercitationem voluptas, magnam aliquid deleniti suscipit dolor
                quibusdam at pariatur non laboriosam eaque fugit iure,
                distinctio, dolorum repellendus sequi accusantium consequuntur
                harum rem aspernatur eum dolore? Quisquam?
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
