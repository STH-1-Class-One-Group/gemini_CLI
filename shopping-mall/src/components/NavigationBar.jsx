import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">홈</Nav.Link>
          <Nav.Link href="#fashion">패션 의류</Nav.Link>
          <Nav.Link href="#electronics">가전 디지털</Nav.Link>
          <Nav.Link href="#food">식품</Nav.Link>
          <Nav.Link href="#beauty">뷰티</Nav.Link>
          <Nav.Link href="#living">생활/건강</Nav.Link>
          <Nav.Link href="#sports">스포츠/레저</Nav.Link>
          <Nav.Link href="#books">도서/음반</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
