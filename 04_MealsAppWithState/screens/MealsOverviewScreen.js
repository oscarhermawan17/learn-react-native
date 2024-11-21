import { useEffect } from "react"

import { MEALS, CATEGORIES } from "../data/dummy-data"
import MealList from "../components/MealList/MealList"

export default function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0
  })

  // useLayoutEffect
  useEffect(() => {
    const categotyTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title

    navigation.setOptions({
      title: categotyTitle,
    })
  }, [catId, navigation])

  return <MealList items={displayedMeals} />
}
