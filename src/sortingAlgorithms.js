export function mergeSortAlgorithm(array){
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

// ==================================================================================

export function quickSortAlgorithm(array) {
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

// ==================================================================================

export function bubbleSortAlgorithm(array){
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

// ==================================================================================

export function insertionSortAlgorithm(array){
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

// ==================================================================================

export function selectionSortAlgorithm(array){
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

// ==================================================================================

export function heapSortAlgorithm(array) {
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

// ==================================================================================

function swap(i, j, array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}


function slide(i, j, array){
    let temp = array[j];
    while(j > i){
        array[j] = array[j-1];
        j-=1;
    }
    array[j] = temp;
}
