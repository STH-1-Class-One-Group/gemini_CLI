import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Gemini Shop</h5>
            <p>최고의 품질, 합리적인 가격. Gemini Shop에서 특별한 경험을 시작하세요.</p>
          </Col>
          <Col md={4}>
            <h5>고객 센터</h5>
            <ul className="list-unstyled">
              <li><a href="#notice" className="text-white text-decoration-none">공지사항</a></li>
              <li><a href="#faq" className="text-white text-decoration-none">자주 묻는 질문</a></li>
              <li><a href="#contact" className="text-white text-decoration-none">1:1 문의</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>정보</h5>
            <ul className="list-unstyled">
              <li><a href="#terms" className="text-white text-decoration-none">이용약관</a></li>
              <li><a href="#privacy" className="text-white text-decoration-none">개인정보처리방침</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2026 Gemini Shop. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
