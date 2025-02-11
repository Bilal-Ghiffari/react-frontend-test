import * as React from "react";
import { ICoffee } from "../type";
import { formatRupiah } from "../utils";
import { getListOfIngredients } from "../services/localStorage";

const useRecipe = () => {
  const [recipeIngredients, setRecipeIngredients] = React.useState<ICoffee[]>(
    []
  );
  const [cupCount, setCupCount] = React.useState<number>(1);

  React.useEffect(() => {
    setRecipeIngredients(getListOfIngredients());
  }, []);

  const handleSubmit = (values: { cups: number }) => {
    setCupCount(values.cups);
  };

  const totalCOGS = recipeIngredients.reduce((total, ingredient) => {
    return total + ingredient.qty * cupCount * ingredient.total_price;
  }, 0);

  const ingredientLists = recipeIngredients.map((coffee) => ({
    key: coffee.id,
    ingredient: coffee.name,
    amounte: `${coffee.qty * cupCount} ${coffee?.uom?.toUpperCase()}`,
    total_cost: formatRupiah(coffee.qty * cupCount * coffee.total_price),
  }));

  return {
    recipeIngredients,
    cupCount,
    ingredientLists,
    totalCOGS,
    setCupCount,
    handleSubmit,
  };
};

export default useRecipe;
