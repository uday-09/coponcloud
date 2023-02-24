import "./index.css";

const TabItem = (props) => {
  const { tabDetails, highlight } = props;
  const { displayText, tabId } = tabDetails;
  const highLightClassName = highlight ? "active-tab-btn" : "";

  const activate = () => {
    const { isActive } = props;
    isActive(tabId);
  };

  return (
    <li className="tab-item-container ">
      <button
        type="button"
        className={`tab-btn ${highLightClassName}`}
        onClick={activate}
      >
        {displayText}
      </button>
    </li>
  );
};

export default TabItem;
