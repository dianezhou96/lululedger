import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FAQData } from "../../types";
import { Loading } from "./Loading";

export const FAQ: React.FC = () => {
  const [faqs, setFAQs] = useState<Array<FAQData>>([]);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    const faqs = await fetch("/shop/faqs").then((data) => data.json());
    console.log(faqs);
    setFAQs(faqs);
    setLoading(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Card style={{ margin: "2em" }}>
      <List itemLayout="vertical">
        {faqs.map((faq: FAQData, idx) => {
          return (
            <List.Item key={idx}>
              <h3>{faq.question}</h3>
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </List.Item>
          );
        })}
        {/* <List.Item>
          <h3></h3>
          <p>
            This fundraiser is for{" "}
            <b>friends and family of the SFIT community</b>. Friends and family
            get a discount on select Lululemon merchandise (along with the bonus
            option to acquire some limited edition SFIT collectibles this time
            around!).
          </p>
        </List.Item> */}
      </List>
    </Card>
  );
};
