import PropTypes from 'prop-types'
import styles from "./IngredientDetails.module.css";


const IngredientDetails = props => {
  const {image_large, carbohydrates, name, calories, proteins, fat} = props.item;
  return (
    <div className={styles.container}>
      <img src={image_large} alt={name} className={styles.image}/>
      <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
      <ul className={`${styles.list} pt-8 text_color_inactive`}>
        <li className={styles.listItem} >
          <span className="text text_type_main-default">Калории,ккал</span>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li className={styles.listItem} >
          <span className="text text_type_main-default">Белки, г</span>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li className={styles.listItem} >
          <span className="text text_type_main-default">Жиры, г</span>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li className={styles.listItem} >
          <span className="text text_type_main-default">Углеводы, г</span>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>

  );
};

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    uuid: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string
  })
};

export default IngredientDetails;
