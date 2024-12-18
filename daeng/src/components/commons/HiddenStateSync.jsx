const HiddenStateSync = ({ favorites }) => {
    return <div style={{ display: "none" }} data-favorites={JSON.stringify(favorites)}></div>;
  };

export default HiddenStateSync;