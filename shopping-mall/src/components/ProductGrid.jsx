import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
  { id: 1, name: '프리미엄 무선 이어폰', price: '129,000원', image: 'https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Product+1' },
  { id: 2, name: '스마트 체중계', price: '45,000원', image: 'https://via.placeholder.com/300x200/20B2AA/FFFFFF?text=Product+2' },
  { id: 3, name: '에어프라이어 5L', price: '89,000원', image: 'https://via.placeholder.com/300x200/FFD700/FFFFFF?text=Product+3' },
  { id: 4, name: '데일리 백팩', price: '55,000원', image: 'https://via.placeholder.com/300x200/6A5ACD/FFFFFF?text=Product+4' },
  { id: 5, name: '유기농 커피 원두', price: '22,000원', image: 'https://via.placeholder.com/300x200/F08080/FFFFFF?text=Product+5' },
  { id: 6, name: 'LED 스탠드 조명', price: '38,000원', image: 'https://via.placeholder.com/300x200/4682B4/FFFFFF?text=Product+6' },
];

const ProductGrid = ({ title }) => {
  return (
    <Container className="mb-4">
      <h2 className="text-center mb-4">{title}</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{product.name}</Card.Title>
                <Card.Text className="fw-bold text-primary mt-auto">{product.price}</Card.Text>
                <Button variant="primary">자세히 보기</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
