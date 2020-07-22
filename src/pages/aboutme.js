import React from "react";
import Layout from "../components/layout";
import "./styles/aboutme.scss";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
function Aboutme() {
  return (
    <Layout>
      <div className="about-container">
        <FaQuoteLeft />
        <span>
          현재 ES6,React,Nodejs,express를 중점으로 공부중입니다. <br />
          실력도 중요하지만 집념과 끈기가 바탕이 되는 개발자를 목표로 하고
          있습니다.
        </span>
        <FaQuoteRight />
      </div>
    </Layout>
  );
}

export default Aboutme;
