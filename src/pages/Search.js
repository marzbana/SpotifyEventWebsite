
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Search.css'



  
const SearchPage = () => {
  return (
    <Container className="mt-5">
      <Row className="home-button">
        <Col className="text-center">
          <Link to="/">
            <Button variant="primary">Home</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center search-section">
        <Col md={6}>
          <h1 className="text-center mb-4">Do you want to see your followed artists?</h1>
          <div className="centered-button">
            <Link to="/artists/loggedIn=true">
              <Button variant="success">Yes</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
  


export default SearchPage;
