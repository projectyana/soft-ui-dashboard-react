import FooterApi from "apis/Footer";

const handleOrder = ({ index, id, direction, data, setData }) => {
  FooterApi.orderMove(id, direction)
    .then((res) => {
      const shallowData = [...data];
      const moveItem = shallowData[index];

      if (direction === "up") {
        const prevItem = shallowData[index - 1];
        shallowData[index] = prevItem;
        shallowData[index - 1] = moveItem;
      } else {
        const afterItem = shallowData[index + 1];
        shallowData[index] = afterItem;
        shallowData[index + 1] = moveItem;
      }

      setData(shallowData);
    })
    .catch(({ response }) =>
      window.alert(response?.data?.message ?? "Unable to perform this action!")
    );
};

export default handleOrder;
