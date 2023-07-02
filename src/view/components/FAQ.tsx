import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // support for github flavored markdown
import { FAQData } from "../../types";
import { Loading } from "./Loading";

export const FAQ: React.FC = () => {
  const [faqs, setFAQs] = useState<Array<FAQData>>([]);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    const faqs = await fetch("/shop/faqs").then((data) => data.json());
    setFAQs(faqs);
    setLoading(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Card style={{ margin: "auto", maxWidth: 800 }}>
      <List itemLayout="vertical" className="faq-list">
        {faqs.map((faq: FAQData, idx) => {
          return (
            <List.Item key={idx}>
              <h3>{faq.question}</h3>
              <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              >
                {faq.answer}
              </ReactMarkdown>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
};
