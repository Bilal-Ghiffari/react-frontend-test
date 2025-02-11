export const getListOfIngredients = () => {
  const storedIngredients = localStorage.getItem("ingredients");
  if (!storedIngredients) {
    localStorage.setItem("ingredients", JSON.stringify([]));
    return [];
  }
  return JSON.parse(storedIngredients);
};

export const addIngredients = (newIngredients: any) => {
  const ingredients = getListOfIngredients();
  const id = Date.now();
  ingredients.push({ id, ...newIngredients });
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
};

export const updateIngredients = (id: number, updatedData: any) => {
  const ingredients = getListOfIngredients();
  const updatedIngredients = ingredients.map((item: any) =>
    item.id === id ? { ...item, ...updatedData } : item
  );

  localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
};

export const deleteIngredients = (id: number) => {
  const ingredients = getListOfIngredients();
  const updatedIngredients = ingredients.filter((item: any) => item?.id !== id);
  localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
};

export const deleteAccessUser = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    localStorage.removeItem("authToken");
  }
};
