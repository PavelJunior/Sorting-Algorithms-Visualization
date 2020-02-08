import {swap} from './helpers/swap';

export function quickSort(array) {
    let animations = [];
    quickSortHelper(array, 0, array.length-1, animations);
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations){
    if(startIdx >= endIdx) {
        if (startIdx === endIdx){
            animations.push({i: startIdx, j: startIdx, operation: 'check'});
            animations.push({i: endIdx, j: startIdx, operation: 'afterLoop'});
        }
        return;
    }
    let pivotIdx = startIdx;
    let leftIdx = startIdx+1;
    let rightIdx = endIdx;
    while(rightIdx >= leftIdx){
        animations.push({i: rightIdx, j: leftIdx, k: pivotIdx, operation: 'check'});
        if(array[pivotIdx] < array[leftIdx] && array[pivotIdx] > array[rightIdx]){
            animations.push({i: rightIdx, j: leftIdx, operation: 'beforeChange'});
            swap(rightIdx, leftIdx, array);
            animations.push({i: rightIdx, j: leftIdx, operation: 'swap'});
        }
        animations.push({i: rightIdx, j: leftIdx, k: pivotIdx, operation: 'afterIteration'});
        if (array[leftIdx] <= array[pivotIdx]){
            leftIdx++;
        }
        if(array[rightIdx] >= array[pivotIdx]){
            rightIdx--;
        }
    }
    animations.push({i: rightIdx, j: pivotIdx, operation: 'beforeChange'});
    swap(pivotIdx, rightIdx, array);
    animations.push({i: rightIdx, j: pivotIdx, operation: 'swap'});
    animations.push({i: pivotIdx, j: rightIdx, operation: 'afterLoop'});

    let leftIsSmaller = rightIdx - startIdx - 1 < endIdx - rightIdx + 1;
    if(leftIsSmaller){
        quickSortHelper(array, startIdx, rightIdx-1, animations);
        quickSortHelper(array, rightIdx+1, endIdx, animations);
    } else {
        quickSortHelper(array, rightIdx+1, endIdx, animations);
        quickSortHelper(array, startIdx, rightIdx-1, animations);
    }
}