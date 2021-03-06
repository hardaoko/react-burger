import { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";
import { MODAL_DETAILS_OPEN } from "../../services/actions/ingredients";
import { useMyDispatch, useMySelector } from "../../utils/types";


const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  const { ingredients } = useMySelector((store) => store.ingredients);

  const refBun = useRef<HTMLHeadingElement>(null);
  const refSauce = useRef<HTMLHeadingElement>(null);
  const refMain = useRef<HTMLHeadingElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);

  const dispatch = useMyDispatch();

  const scrollPosition = () => {
    if(refBun.current && refSauce.current && refMain.current && refDiv.current) {
      if (
        refDiv.current.scrollTop + refBun.current.offsetTop <
        refSauce.current.offsetTop
      ) {
        setCurrent("bun");
        return;
      }

      if (
        refDiv.current.scrollTop + refBun.current.offsetTop <
        refMain.current.offsetTop
      ) {
        setCurrent("sauce");
        return;
      }
    }
    setCurrent("main");
  };

  const scrollToBun = () => {
    refBun.current && refBun.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSauce = () => {
    refSauce.current && refSauce.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMain = () => {
    refMain.current && refMain.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h1  className="mt-10 mb-5 text text_type_main-large" data-at="main-title">Соберите бургер</h1>
      <div className={styles.tab_container}>
        <Tab value="bun" active={current === "bun"} onClick={scrollToBun}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={scrollToSauce}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={scrollToMain}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients_container} `}
        onScroll={scrollPosition}
        ref={refDiv}
      >
        <h2
          id="bun"
          className="mb-6 mt-10 text text_type_main-medium"
          ref={refBun}
        >
          Булки
        </h2>
        <ul className={styles.list} >
          {ingredients.map(
            (item) =>
              item.type === "bun" && (
                <Ingredient
                  key={item._id}
                  item={item}
                  onOpen={() => {
                    dispatch({ type: MODAL_DETAILS_OPEN, payload: item });
                  }}
                />
              )
          )}
        </ul>
        <h2
          id="sauce"
          className="mb-6 mt-10 text text_type_main-medium"
          ref={refSauce}
        >
          Соусы
        </h2>
        <ul className={styles.list}>
          {ingredients.map(
            (item) =>
              item.type === "sauce" && (
                <Ingredient
                  key={item._id}
                  item={item}
                  onOpen={() => {
                    dispatch({ type: MODAL_DETAILS_OPEN, payload: item });
                  }}
                />
              )
          )}
        </ul>
        <h2
          id="main"
          className="mb-6 mt-10 text text_type_main-medium"
          ref={refMain}
        >
          Начинки
        </h2>
        <ul className={styles.list}>
          {ingredients.map(
            (item) =>
              item.type === "main" && (
                <Ingredient
                  key={item._id}
                  item={item}
                  onOpen={() => {
                    dispatch({ type: MODAL_DETAILS_OPEN, payload: item });
                  }}
                />
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default BurgerIngredients;
