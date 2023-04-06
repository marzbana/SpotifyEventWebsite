import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Do you want to see your followed artists?</h1>
          <div className="text-center">
            <Link to="/artists">
              <Button variant="success">Yes</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchPage;


