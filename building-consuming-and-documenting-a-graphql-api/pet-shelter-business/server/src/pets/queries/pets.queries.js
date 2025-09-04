import { getItem, listItems } from "../models/pets.models.js";

export const getPet = (id) => {
  try {
    const res = getItem(id);
    return res;
  } catch (err) {
    return err;
  }
};

export const listPets = () => {
  try {
    const res = listItems();
    return res;
  } catch (err) {
    return err;
  }
};
