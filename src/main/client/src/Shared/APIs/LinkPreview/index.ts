import axios from "axios";

export const getDocument = async (url: string) => {
  const { headers } = await axios.head(url);
};
