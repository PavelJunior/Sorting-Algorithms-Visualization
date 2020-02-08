import {swap} from './helpers/swap';

export function heapSort(array) {
    let animations = [];
    buildMaxHeap(array, animations);
    for(let endIdx = array.length-1; endIdx > 0; endIdx--){
        animations.push({i: 0, j: endIdx, operation: 'beforeChange'});
        swap(0, endIdx, array);
        animations.push({i: 0, j: endIdx, operation: 'swap'});
        animations.push({i: 0, j: endIdx, operation: 'afterLoop'});
        siftDown(0, endIdx-1, array, animations);
    }
    animations.push({i:0, j:array.length, operation: 'done'});
    return animations;
}

function buildMaxHeap(array, animations){
    let firstChildIdx = Math.floor((array.length-2)/2);
    for(let currentIdx = firstChildIdx; currentIdx >= 0; currentIdx--){
        siftDown(currentIdx, array.length-1, array, animations)
    }
}

function siftDown(currentIdx, endIdx, heap, animations){
    let firstChildIdx = currentIdx*2+1;
    while(firstChildIdx <= endIdx){
        let secondChildIdx = currentIdx*2+2 <= endIdx ? currentIdx*2+2 : -1;
        animations.push({i: currentIdx, j: firstChildIdx, k: secondChildIdx, operation: 'check'});
        let idxToSwap;
        if(secondChildIdx !== -1 && heap[secondChildIdx] > heap[firstChildIdx]){
            idxToSwap = secondChildIdx;
        } else {
            idxToSwap = firstChildIdx;
        }
        if(heap[idxToSwap] > heap[currentIdx]){
            animations.push({i: idxToSwap, j: currentIdx, operation: 'beforeChange'});
            swap(idxToSwap, currentIdx, heap);
            animations.push({i: idxToSwap, j: currentIdx, operation: 'swap'});
            animations.push({i: currentIdx, j: firstChildIdx, k: secondChildIdx, operation: 'afterIteration'});
            currentIdx = idxToSwap;
            firstChildIdx = currentIdx*2+1;
        } else {
            animations.push({i: currentIdx, j: firstChildIdx, k: secondChildIdx, operation: 'afterIteration'});
            return;
        }
    }
}