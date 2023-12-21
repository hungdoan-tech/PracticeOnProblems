export const Vector = (data) => {
  const vector = [];

  if (!data) {
    return vector;
  }

  for (element in data) {
    vector.push(element);
  }
  
  return vector;
};
