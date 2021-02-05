import Head from "next/head";

export default function Home() {
  const style = { background: "#0092ff", padding: "8px 0" };

  return (
    <div>
      <Head>
        <title>Quizee</title>
        <link rel="icon"></link>
      </Head>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div style={style}></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
