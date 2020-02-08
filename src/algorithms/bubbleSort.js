import {swap} from './helpers/swap';

export function bubbleSort(array){
    let animations = [];
    let sorted = false;
    let counter = 0;
    while(!sorted){
        sorted = true;
        for(let i = 0; i < array.length-1-counter; i++){
            let j = i+1;
            animations.push({i, j, operation: 'check'});
            if(array[i] > array[j]){
                animations.push({i, j, operation: 'beforeChange'});
                sorted = false;
                swap(i, j, array);
                animations.push({i, j, operation: 'swap'});
            }
            animations.push({i, j, operation: 'afterIteration'});
        }
        animations[animations.length-1].operation = 'afterLoop';
        counter+=1;
    }
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}