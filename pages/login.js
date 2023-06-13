import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import Head from "next/head";
// import Image from 'next/image'

export default function Register(props) {
  const [warning, setwarning] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const email = "";

  var data = props.profile;
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      var obj = {};
      var res = Object.keys(data).map(function (name) {
        obj[name] = data[name];
        return obj;
      });
      setProfile(res[0]);
    };

    fetchData();
  }, []);

  const handleClick = () => {
    // setUsers(true)
    router.push("/success");
  };

  const registerUser = async (event) => {
    event.preventDefault();
    // alert(event.target.name.value)
    const res = await fetch("/api/liff-api/index.php/users/register", {
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        mobile: event.target.mobile.value,
        uid: props.profile.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    if (result.status === "success") {
      router.push("/success");
    } else {
      setwarning(true);
    }
    // result.user => 'Ada Lovelace'
  };

  return (
    <section>
      <Head>
        <title>Register</title>
      </Head>
      <Container fluid="" className="m-0 p-2">
        <Row className="justify-content-md-center mb-2">
          <Col span={12} className="text-center">
            {warning && (
              <Alert variant="danger">Opp!!!, Something error.</Alert>
            )}
            <h3>Register</h3>
            {/* {props.profile2.userId} */}
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col className="text-center">
            {profile.pictureUrl != undefined ? (
              <div>
                <Image
                  src={profile.pictureUrl}
                  alt={profile.userId}
                  width={150}
                  height={150}
                  roundedCircle
                  className="m-2"
                />
                {/* <div>{profile.userId}</div> */}
                <div>{profile.displayName}</div>
                <div>{profile.statusMessage}</div>
                <div>{props.email}</div>
              </div>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form onSubmit={registerUser}>
              <Form.Group>
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter fullname"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mobile Phone</Form.Label>
                <Form.Control
                  id="mobile"
                  name="mobile"
                  type="text"
                  placeholder="Enter mobile phone number"
                  required
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Check
                  type="checkbox"
                  label="Accept Term & Condition"
                  required
                />
              </Form.Group>
              <div className="text-center mt-2">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
