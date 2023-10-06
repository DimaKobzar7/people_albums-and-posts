const getRouteData = async (collection, categoryId = "", category = "") => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/${collection}/${categoryId}/${category}`
  );

  const getData = await data.json();

  return getData;
};

const fetchData = async (
  collection = "",
  categoryId = "",
  category = "",
  ...setData
) => {
  try {
    const data = await getRouteData(collection, categoryId, category);

    if (setData.length > 1) {
      setData.forEach((item) => {
        item(data);
      });
    } else if (setData.length === 1) {
      setData[0](data);
    } else {
      return data;
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export default fetchData;
