
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Image,
  Form,
  Alert,
  Modal,
} from "react-bootstrap";
import { CheckCircleFill } from 'react-bootstrap-icons'


export default function Success () {

  const handleClick = async () => {
    const liff = (await import("@line/liff")).default;
    liff.closeWindow()
  }

  return (
    <section>
      <Head>
        <title> Login - Success </title>
      </Head>
      <Container fluid="md" className="mt-5 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col className="text-center">
            <CheckCircleFill color="green" size={96} />
            <h3>Thankyou</h3>
            <p>Login success</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}> 
            <Button  variant="success" type="button" onClick={handleClick} className='w-100'>
              Close
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}