import { dateFormatter } from "@/lib/date";
import styled from "styled-components";

const StyledOrders = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    font-weight: bold;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;
export default function SingleOrder({ line_items, createdAt, ...other }) {
  return (
    <StyledOrders>
      <div>
        <time>{dateFormatter(createdAt)}</time>
        <Address>
          {other.name}
          <br />
          {other.email}
          <br />
          {other.streetAddress} <br />
          {other.city} {other.postalCode}
          <br />
          {other.province} {other.country}
        </Address>
      </div>
      <div>
        {line_items?.length > 0 &&
          line_items.map((order, index) => (
            <ProductRow key={index}>
              <span>{order.quantity} X</span>{" "}
              {order.price_data.product_data.name}
            </ProductRow>
          ))}
      </div>
    </StyledOrders>
  );
}
