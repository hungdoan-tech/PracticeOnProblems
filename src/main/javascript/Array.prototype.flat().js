/**
 * @param { Array } originalArray
 * @param { number } depth
 * @returns { Array }
 */
function flat(originalArray, depth = 1) {
    if(depth < 0){
        return null;
    }

    let newArr = [];

    for (const element of originalArray){

        if ((element instanceof Array) === false){
            newArr.push(element);
            continue;
        }

         let subFlatArray = flat(element, depth - 1);

         if(subFlatArray === null){
             newArr.push(element);
             continue;
         }

         for (const subFlatArrayElement of subFlatArray){
             newArr.push(subFlatArrayElement);
         }
    }

    return newArr;
}

const arr = [1, [2], [3, [4]]];

console.log(flat(arr))
// [1, 2, 3, [4]]

console.log(flat(arr, 1))
// [1, 2, 3, [4]]

console.log(flat(arr, 2))
// [1, 2, 3, 4]