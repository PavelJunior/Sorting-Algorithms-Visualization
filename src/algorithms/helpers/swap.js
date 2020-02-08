export function swap(i, j, array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}