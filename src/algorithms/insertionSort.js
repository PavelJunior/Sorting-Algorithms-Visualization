import {swap} from './helpers/swap';

export function insertionSort(array){
    let animations = [];
    for(let i = 1; i < array.length; i++){
        let j = i;
        animations.push({i: j, j: j-1, operation: 'check'});
        while(j > 0 && array[j] < array[j-1]){
            animations.push({i: j, j: j-1, operation: 'check'});
            animations.push({i: j, j: j-1, operation: 'beforeChange'});
            swap(j, j-1, array);
            animations.push({i: j, j: j-1, operation: 'swap'});
            animations.push({i: j, j: j-1, operation: 'afterIteration'});
            j--;
        }
        if(j > 0){
            animations.push({i: j, j: j-1, operation: 'check'});
            animations.push({i: j, j: j-1, operation: 'afterIteration'})
        }
    }
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}