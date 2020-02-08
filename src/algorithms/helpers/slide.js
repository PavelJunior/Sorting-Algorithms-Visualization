export function slide(i, j, array){
    let temp = array[j];
    while(j > i){
        array[j] = array[j-1];
        j-=1;
    }
    array[j] = temp;
}