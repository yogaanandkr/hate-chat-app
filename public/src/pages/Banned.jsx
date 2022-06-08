import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Banned() {
  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate("/login");
  // }, 3000);

  return (
    <Container>
      <div className="body">
        <h1>
          HUMAN ERROR :( <br /> <br />
        </h1>
        <p>
          You have been blocked permanently for being toxic beyond a certain
          limit !!!
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #1b4332;
  justify-content: center;
  text-align: center;
  padding-top: 20%;
  color: white;
  letter-spacing: 5px;
  p {
    font-size: 20px;
  }
`;

export default Banned;
