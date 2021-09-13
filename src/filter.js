export const filterValues = ["All", "Components", "Icons", "Illustrations"];

export const getFilterCondition = (filterValue, key) => {
  if (filterValue === "All") {
    return true;
  }
  if (filterValue === "Icons" && key.includes("Svg")) {
    return true;
  }
  if (filterValue === "Illustrations" && key.includes("Illustration")) {
    return true;
  }
  if (
    filterValue === "Components" &&
    !key.includes("Svg") &&
    !key.includes("Illustration")
  ) {
    return true;
  }
  return false;
};
