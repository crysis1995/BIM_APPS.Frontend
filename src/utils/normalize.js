export const normalize = (array, by_key = "id") => {
    return array.reduce((prev, curr) => ({ ...prev, [curr[by_key]]: curr }), {});
};
