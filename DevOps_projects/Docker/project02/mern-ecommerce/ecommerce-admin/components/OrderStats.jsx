import axios from "axios";
import { useEffect, useState } from "react";
import Spinners from "./Spinners";
import { subHours } from "date-fns";

export default function OrderStats() {
  /********** application states **********/
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /******************************************/

  useEffect(() => {
    setIsLoading(true);
    /** fetch all orders on mount */
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  /** spinner */
  if (isLoading) {
    return (
      <div className="my-4">
        <Spinners fullWidth={true} />
      </div>
    );
  }

  /**
   * filter out the orders for today
   * this week
   * this month
   * using date-fns
   */
  const ordersToday = orders.filter(
    (order) => new Date(order.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = orders.filter(
    (order) => new Date(order.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (order) => new Date(order.createdAt) > subHours(new Date(), 24 * 30)
  );

  /** functionality to sum all orders (total)
   * Today, Week, Month
   */

  function ordersTotal(orders) {
    let total = 0;

    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((p) => {
        total += p.price_data.unit_amount / 100;
      });
    });
    return Intl.NumberFormat("en-CA").format(total);
  }

  return (
    <div className="">
      {/* orders */}
      <h2>Orders</h2>
      <div className="tile__grid">
        <div className="tile">
          <h3 className="tile__header">Today</h3>
          <div className="tile__number">{ordersToday.length}</div>
          <div className="tile__desc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile__header">This Week</h3>
          <div className="tile__number">{ordersWeek.length}</div>
          <div className="tile__desc">{ordersWeek.length} orders this week</div>
        </div>
        <div className="tile">
          <h3 className="tile__header">This Month</h3>
          <div className="tile__number">{ordersMonth.length}</div>
          <div className="tile__desc">
            {ordersMonth.length} order this month
          </div>
        </div>
      </div>
      {/* revenues */}
      <h2>Revenues</h2>
      <div className="tile__grid">
        <div className="tile">
          <h3 className="tile__header">Today</h3>
          <div className="tile__number">${ordersTotal(ordersToday)}</div>
          <div className="tile__desc">{ordersToday.length} order today</div>
        </div>
        <div className="tile">
          <h3 className="tile__header">This Week</h3>
          <div className="tile__number">${ordersTotal(ordersWeek)}</div>
          <div className="tile__desc">{ordersWeek.length} order this week</div>
        </div>
        <div className="tile">
          <h3 className="tile__header">This Month</h3>
          <div className="tile__number">${ordersTotal(ordersMonth)}</div>
          <div className="tile__desc">
            {ordersMonth.length} order this month
          </div>
        </div>
      </div>
    </div>
  );
}
