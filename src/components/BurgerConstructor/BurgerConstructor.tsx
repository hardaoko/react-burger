import { FC, useCallback } from "react";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  addBun,
  addIngredients,
  deleteIngredients,
  getOrder,
  MODAL_CLOSE,
  MODAL_ORDER_OPEN,
  replaceIngredients,
} from "../../services/actions/ingredients";
import { useDrag, useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import { IBurgerData, IChosenIngredient, useMyDispatch, useMySelector } from "../../utils/types";
import Loading from "../Loading/Loading";


declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const BurgerConstructor = () => {
  const {
    chosenIngredients,
    modalOrderVisible,
    bun,
    finalCost,
    orderRequest,
  } = useMySelector((store) => store.ingredients);
  const ingredients = useMySelector((store) => store.ingredients.ingredientsList);
  const { isAuth, accessToken } = useMySelector((store) => store.profile);
  const history = useHistory();

  type TDraggableIngredient = {
    item: IChosenIngredient
  }

  const dispatch = useMyDispatch();

  //  Формирование номера заказа
  const createOrder = () => {
    let finalOrder = [...chosenIngredients, bun]
    dispatch(getOrder(accessToken, finalOrder));
  };

  //  Открытие модального окна
  const openModal = () => {
    if (isAuth) {
      createOrder();
      dispatch({ type: MODAL_ORDER_OPEN });
    } else history.push("/login");
  };

  const closeModal = () => {
    dispatch({ type: MODAL_CLOSE });
  };

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  //  useDrop при добавлении ингредиента
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item: IBurgerData) {
      item.type === "bun"
        ? dispatch(addBun(chosenIngredients, item))
        : chosenIngredients.length > 0 &&
          dispatch(addIngredients(chosenIngredients, item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  //  Подсветка дроп-контейнера
  const highlightTarget = isHover ? styles.highlight : "";

  let targetIndex: number;
  let startIndex: number;

  const DraggableItem:FC<TDraggableIngredient> = ({ item }) => {
    const dispatch = useMyDispatch();
    const { chosenIngredients } = useMySelector((store) => store.ingredients);
    const [, dragRef] = useDrag({
      type: "orderList",
      item: { item },
    });

    //  useDrop для переноса ингредиентов
    const [, dropRef] = useDrop({
      accept: "orderList",
      drop() {
        const replaceAction = replaceIngredients(chosenIngredients, startIndex, targetIndex)
        replaceAction && dispatch(replaceAction);
      },
      hover(dragItem: TDraggableIngredient) {
        targetIndex = item.index;
        startIndex = dragItem.item.index;
      },
      collect: (monitor) => ({
        sortHover: monitor.isOver(),
      }),
    });

    return (
      <li
        ref={(item) => dragRef(dropRef(item))}
        className={`${styles.item}
          ${item.index !== 1 && "pt-5"}
          ${targetIndex === item.index ? styles.dropItem : ""}
          ${startIndex === item.index ? styles.draggedItem : ""}`}
      >
        <DragIcon type="primary" />
        <div className={styles.itemCard}>
          <ConstructorElement
            text={item.element.name}
            price={item.element.price}
            thumbnail={item.element.image}
            handleClose={() => {
              dispatch(deleteIngredients(chosenIngredients, item.index));
            }}
          />
        </div>
      </li>
    );
  };

  const IngredientSection = useCallback(() => {
    return (
      <ul className={`${styles.list} pr-4 pl-4  `}>
        {ingredients.map((item) => {
          return (
            <DraggableItem item={item} key={item.uuid} />
          );
        })}
      </ul>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  type TBunCallback = (side: "top" | "bottom" | undefined) => React.ReactNode;

  const BunElement = useCallback<TBunCallback>(
    ( side ) => {
      return (
        <div
          className={`${styles.item}  ${
            side === "top" ? " ml-10 mb-5" : "mt-5 ml-10"
          }`}
        >
          <ConstructorElement
            type={side}
            isLocked={true}
            text={`${bun?.element.name} ${side === "top" ? "(верх)" : "(низ)"}`}
            price={bun ? bun.element.price : 0}
            thumbnail={bun ? bun.element.image : ''}
          />
        </div>
      );
    },
    [bun]
  );

  return (
    <div
      className={`${styles.container} ${highlightTarget} mt-20 p-1`}
      ref={dropTarget} data-at="constructor"
    >
      {modalOrderVisible && !orderRequest && modal}

      {bun !== null ? BunElement("top")
       : (
        <div
          className={`${styles.tip} mb-15 mr-5 mt-5 text text_type_main-large`}
        >
          Выберите булку
        </div>
      )}
      {bun !== null && <IngredientSection />}

      {bun !== null && BunElement("bottom")}

      <div className={`${styles.button_container} pt-5 pr-5`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{finalCost}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={openModal}
          disabled={bun === null || orderRequest}
        >
          {orderRequest ? <Loading color="light" size="small"/> : "Оформить заказ"}
        </Button>
      </div>

    </div>
  );
};

export default BurgerConstructor;
