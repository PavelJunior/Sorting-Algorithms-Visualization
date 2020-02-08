<template>
    <div>
        <visualizer-header :inProgress="inProgress"
                           :speedFactor="speedFactor"
                           :arraySize="arraySize"
                           :algorithms="algorithms"
                           :speedOptions="speedOptions"
                           @startAlgorithm="runAlgorithm($event)"
                           @resetArray="resetArray"
                           @arraySizeChanged="arraySizeChanged($event)"
                           @speedFactorChanged="speedFactorChanged($event)">
        </visualizer-header>
        <div class="array-container">
            <div v-for="(value, index) in array" class="array-bar" :key="index" :style="getStylesForBar(value)"></div>
        </div>
    </div>
</template>

<script>
    import VisualizerHeader from './VisualizerHeader';

    import {bubbleSort} from './../algorithms/bubbleSort';
    import {mergeSort} from './../algorithms/mergeSort';
    import {quickSort} from './../algorithms/quickSort';
    import {insertionSort} from './../algorithms/insertionSort';
    import {heapSort} from './../algorithms/heapSort';
    import {selectionSort} from './../algorithms/selectionSort';

    const MAIN_COLOR = 'pink';
    const CHECK_COLOR = '#4a9bc4';
    const SWAP_COLOR = '#ff250f';
    const SORTED_COLOR = 'green';
    const PIVOT_COLOR = 'purple';

    export default {
        name: "SortingVisualizer",
        data(){
            return {
                array: [],
                inProgress: false,
                arraySize: 30,
                speedFactor: 1,
                algorithms: {
                    'Bubble Sort': bubbleSort,
                    'Insertion Sort': insertionSort,
                    'Selection Sort': selectionSort,
                    'Heap Sort': heapSort,
                    'Quick Sort': quickSort,
                    'Merge Sort': mergeSort
                },
                speedOptions: [50, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.02]
            }
        },
        methods: {
            runAlgorithm(algorithmName){
                let animations = this.algorithms[algorithmName](this.array.slice());
                this.helperMethod(animations, algorithmName === 'Quick Sort');
            },

            helperMethod(animation, withPivot = false){
                if(this.inProgress) return;
                this.inProgress = true;
                this.resetColors();
                let arrayBars = document.getElementsByClassName('array-bar');
                let timeout = 0;
                for(let a = 0; a < animation.length; a++){
                    let currentAnimation = animation[a];
                    let i = currentAnimation.i;
                    let j = currentAnimation.j;
                    let firstBar = arrayBars[i];
                    let secondBar = arrayBars[j];
                    let operation = currentAnimation.operation;
                    let threeParams = currentAnimation.k !== undefined && currentAnimation.k !== -1 ? true : false;
                    let k, thirdBar;
                    if(threeParams){
                        k = currentAnimation.k;
                        thirdBar = arrayBars[k];
                    }
                    setTimeout(() => {
                        switch(operation){
                            case 'check':
                                firstBar.style.backgroundColor = CHECK_COLOR;
                                secondBar.style.backgroundColor = CHECK_COLOR;
                                if(threeParams && withPivot){
                                    thirdBar.style.backgroundColor = PIVOT_COLOR;
                                } else if(threeParams){
                                    thirdBar.style.backgroundColor = CHECK_COLOR;
                                }
                                break;
                            case 'beforeChange':
                                firstBar.style.backgroundColor = SWAP_COLOR;
                                secondBar.style.backgroundColor = SWAP_COLOR;
                                break;
                            case 'swap':
                                this.swap(i, j, this.array);
                                break;
                            case 'slide':
                                this.slide(i, j, this.array);
                                break;
                            case 'afterIteration':
                                firstBar.style.backgroundColor = MAIN_COLOR;
                                secondBar.style.backgroundColor = MAIN_COLOR;
                                if(threeParams){
                                    thirdBar.style.backgroundColor = MAIN_COLOR;
                                }
                                break;
                            case 'afterLoop':
                                firstBar.style.backgroundColor = MAIN_COLOR;
                                secondBar.style.backgroundColor = SORTED_COLOR;
                                break;
                            case 'done':
                                for(i; i < j; i++){
                                    arrayBars[i].style.backgroundColor = SORTED_COLOR;
                                    this.inProgress = false;
                                }
                                break;
                        }
                    }, timeout);

                    if(operation !== 'afterIteration' && operation !== 'slide'){
                        timeout += this.animationSpeed;
                    }
                }
            },

            swap(i, j){
                let temp = this.array[i];
                this.$set(this.array, i, this.array[j]);
                this.$set(this.array, j, temp);
            },

            slide(i, j, array){
                let temp = array[j];
                while(j > i){
                    this.$set(this.array, j, this.array[j-1]);
                    j-=1;
                }
                this.$set(this.array, j, temp);
            },

            arraySizeChanged(value){
                this.arraySize = value;
                this.resetArray();
            },

            speedFactorChanged(value){
                this.speedFactor = value;
            },

            resetArray(){
                if(this.inProgress) return;
                this.resetColors();
                this.array = [];
                for(let i = 0; i < this.arraySize; i++){
                    this.array.push(this.getRandomNumberInRange(20, 800))
                }
            },

            resetColors(){
                let arrayBars = document.getElementsByClassName('array-bar');
                for(let i = 0; i < this.array.length; i++){
                    arrayBars[i].style.backgroundColor = MAIN_COLOR;
                }
            },

            getRandomNumberInRange(min, max){
                return Math.floor(Math.random() * (max-min+1) + min);
            },

            getStylesForBar(barHeight){
                let windowWidth = (window.innerWidth * 0.7);
                let width = this.arraySize == 4 ?  200 : Math.floor(windowWidth/this.arraySize);
                let margin = Math.ceil(200/this.arraySize);
                let height = window.innerHeight < 1000 ?  barHeight * (window.innerHeight / 1000) : barHeight;
                return {
                    'margin-right': margin + 'px',
                    width: width + 'px',
                    height: height + 'px',
                }
            }
        },
        computed: {
            animationSpeed(){
                return Math.floor(3200/this.arraySize)/this.speedFactor;
            }
        },
        mounted(){
            this.resetArray();
        },
        components: {
            VisualizerHeader
        }
    }
</script>
