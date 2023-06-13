import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Login from "./login";
import Profile from "./profile";

export default function Home() {
  console.log("index file");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState({});
  const [users, setUsers] = useState(false);

  const verify = async (uid) => {
    console.log("result verify");
    const res = await fetch("https://87ae-202-12-97-143.ngrok-free.app/api/liff-api/index.php/users/verify/" + uid, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      method: "GET",
    });
    const result = await res.json();
    return result;
  };


  useEffect(() => {
    const fetchData = async () => {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      const profile = await liff.getProfile();

      const email = await liff.getDecodedIDToken().email;
      setProfile(profile);
      setEmail(email);
      const verifyData = await verify(profile.userId);

      if (verifyData.status === "success") {
        setUsers(verifyData.data);      
      }

    };

    fetchData();
    setLoading(true);
  }, [profile.userId]);

  return (
    <Container fluid="" className=" p-0">
      {!loading ? (
        <Row className="justify-content-md-center p-3">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : profile.userId == undefined ? (
        <Row className="justify-content-md-center p-3">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : !users ? (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Login profile={profile} email={email} />
          </div>
        </div>
      ) : (
        <Profile profile={profile} email={email} users={users} />
      )}
    </Container>
  );
}
