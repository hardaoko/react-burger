import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import OrdersMonitor from "../../components/OrdersMonitor/OrdersMonitor";
import { MODAL_ORDER_INFO_OPEN } from "../../services/actions/ingredients";
import { wsOrdersClose, wsOrdersConnectionStart, WS_CONNECTION_START } from "../../services/actions/orders";
import { AppDispatch, IOrder, RootState } from "../../utils/types";
import styles from "./OrderFeed.module.css";

const OrderFeed = () => {
  const dispatch: AppDispatch = useDispatch()
  const { orders, wsOrders } = useSelector((store: RootState) => store.orders)

  useEffect(() => {
    dispatch(wsOrdersConnectionStart());


  }, [dispatch])

  //const orders: Array<number> = [1,2,3,4,5];

  return (
    <div className={styles.container}>
      <div>
        <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
        <div>
          {
            orders.length > 0 ? (
            <ul className={styles.list}>
              {
                orders?.map((order: IOrder, index: number) => (
                  <OrderComponent order={order} key={index} onOpen={() => {
                    dispatch({ type: MODAL_ORDER_INFO_OPEN, order: order });
                  }}/>
                ))
              }
            </ul>) : (<h1 className="mt-10 mb-5 text text_type_main-large">Загрузка</h1>)
          }

        </div>
      </div>
      <div>
        <OrdersMonitor/>

      </div>
    </div>

  );
};

export default OrderFeed;
