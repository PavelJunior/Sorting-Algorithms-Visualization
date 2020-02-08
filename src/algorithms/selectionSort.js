import {swap} from './helpers/swap';

export function selectionSort(array){
    let currentIdx = 0;
    let animations = [];
    while(currentIdx < array.length-1){
        let minIdx = currentIdx;
        for(let i = currentIdx; i < array.length; i++){
            animations.push({i, j: minIdx, operation: 'check'});
            animations.push({i, j: minIdx, operation: 'afterIteration'})
            if(array[minIdx] > array[i]){
                minIdx = i;
            }
        }
        animations.push({i: currentIdx, j: minIdx, operation: 'beforeChange'});
        swap(minIdx, currentIdx, array);
        animations.push({i: currentIdx, j: minIdx, operation: 'swap'});
        animations.push({i: minIdx, j: currentIdx, operation: 'afterLoop'});
        currentIdx+=1;
    }
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}