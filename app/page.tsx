// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Row className="text-center">
        <Col>
          <h1>Home Page</h1>
          <Button 
            variant="primary" 
            onClick={handleLoginClick} 
            className="mt-3"
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
