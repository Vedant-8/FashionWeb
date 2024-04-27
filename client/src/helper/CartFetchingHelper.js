import axios from "axios";

export const fetchingCartItems = async (accessToken) => {
  const response = await axios.get(
    "https://academics.newtonschool.co/api/v1/ecommerce/cart",
    {
      headers: {
        projectId: "4stjj1sb1x5a",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  // console.log('response',response);
  // return response;
  if (response.status === 200) {
    return {
      cartItems: response.data.data.items,
      totalPrice: response.data.data.totalPrice,
    };
  }
};
