import React from 'react';
import { Navbar, Container, Form, FormControl, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom py-3">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">Gemini Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto flex-grow-1 header-search-form">
            <FormControl
              type="search"
              placeholder="검색어를 입력해주세요."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">검색</Button>
          </Form>
          <Nav className="ms-auto header-icons">
            <Nav.Link href="#login"><i className="bi bi-person"></i> 로그인</Nav.Link>
            <Nav.Link href="#cart"><i className="bi bi-cart"></i> 장바구니</Nav.Link>
            <Nav.Link href="#mypage"><i className="bi bi-gear"></i> 마이페이지</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
