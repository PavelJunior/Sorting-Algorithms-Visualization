import {slide} from './helpers/slide';

export function mergeSort(array){
    if(array.length <= 1) return array;
    let animations = [];
    mergeSortHelper(array, 0, array.length-1, animations);
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}

function mergeSortHelper(array, startIdx, endIdx, animations){
    if(startIdx === endIdx) return;
    let midIdx = Math.floor((endIdx + startIdx)/2);
    mergeSortHelper(array, startIdx, midIdx, animations);
    mergeSortHelper(array, midIdx+1, endIdx, animations);
    merge(array, startIdx, midIdx, endIdx, animations);
}

function merge(array, startIdx, midIdx, endIdx, animations){
    let i = startIdx;
    let j = midIdx+1;
    let finalLoop = (startIdx === 0 && endIdx === array.length-1);

    while(i <= midIdx && j <= endIdx){
        if(array[i] > array[j]){
            animations.push({i, j, operation: 'check'});
            animations.push({i, j, operation: 'beforeChange'});
            animations.push({i, j, operation: 'afterIteration'});
            animations.push({i, j, operation: 'slide'});
            slide(i, j, array);
            animations.push({i, j: i+1, operation: 'beforeChange'});
            if(finalLoop){
                animations.push({i: i+1, j: i, operation: 'afterLoop'});
            } else {
                animations.push({i, j: i+1, operation: 'afterIteration'});
            }
            j+=1;
            i+=1;
            midIdx+=1;
        } else {
            animations.push({i, j, operation: 'check'});
            if(finalLoop){
                animations.push({i: j, j: i, operation: 'afterLoop'});
            } else {
                animations.push({i: i, j: j, operation: 'afterIteration'});
            }
            i+=1;
        }

    }
}