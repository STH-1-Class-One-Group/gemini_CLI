import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainCarousel = () => {
  return (
    <Container className="mb-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400/87CEEB/FFFFFF?text=Promotion+Banner+1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>첫 번째 프로모션</h3>
            <p>다양한 상품을 만나보세요!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400/90EE90/FFFFFF?text=Promotion+Banner+2"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>두 번째 특별 할인</h3>
            <p>놓칠 수 없는 기회!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400/FFD700/FFFFFF?text=Promotion+Banner+3"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>세 번째 신상품 출시</h3>
            <p>새로운 트렌드를 경험하세요.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default MainCarousel;
