import PropTypes from "prop-types";
import styles from "./CustomInput.module.css";

const CustomInput = ({
  startEndorment,
  endEndorment,
  type,
  name,
  value,
  placeholder,
  handleChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      {startEndorment}
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {endEndorment}
    </div>
  );
};

CustomInput.propTypes = {
  startEndorment: PropTypes.element,
  endEndorment: PropTypes.element,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

export default CustomInput;
