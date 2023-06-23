import { Card, List } from "antd";
import React from "react";

export const FAQ: React.FC = () => {
  return (
    <Card style={{ margin: "2em" }}>
      <List itemLayout="vertical">
        <List.Item>
          <h3>Who is this fundraiser for?</h3>
          <p>
            This fundraiser is for{" "}
            <b>friends and family of the SFIT community</b>. Friends and family
            get a discount on select Lululemon merchandise (along with the bonus
            option to acquire some limited edition SFIT collectibles this time
            around!).
          </p>
        </List.Item>
        <List.Item>
          <h3>How are the proceeds of this fundraiser going to be used?</h3>
          <p>
            Proceeds go to the <b>SFIT teams</b> and help cover costs such as
            coaching, ice time, competition fees, and costumes and props. This
            will ultimately provide our skaters with{" "}
            <b>more support and opportunities to grow with the team</b>.
          </p>
        </List.Item>
        <List.Item>
          <h3>How does this fundraiser work?</h3>
          <ol>
            <li>
              <b>Ordering:</b> Shop on this website and submit your orders by
              the <b>deadline - Monday, July 3, 2023</b>.
            </li>
            <li>
              <b>Invoice and payment:</b> After we place the aggregate order for
              this fundraiser, you will receive an invoice for your orders. Your
              invoice will include the final total cost (which may differ from
              the estimated total cost depending on the shipping cost) and
              indicate if some items could not be fulfilled. We will also inform
              you about how to make your payment.
            </li>
            <li>
              <b>Pickup:</b> Items will be shipped to an SFIT team manager.
              After we receive your payment, you can arrange pick up with us
              either directly with an SFIT team manager or through the SFIT team
              member you are associated with.
            </li>
          </ol>
        </List.Item>
      </List>
    </Card>
  );
};
