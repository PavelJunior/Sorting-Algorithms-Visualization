<template>
	<div>
		<div>
			<div class="menu" :style="disableMenu">
				<div class="sub-menu">
					<div @click="resetArray" class="menu-left">Reset Array</div>
				</div>
				<div class="sub-menu">
					<div class="range-input">
						<p>Array Size</p>
						<input type="range" :value="arraySize" @input="arraySizeChanged" min="4" max="280" step="3" :disabled="inProgress">
						<div class="array-size">{{ arraySize }}</div>
					</div>

					<div class="range-input">
						<p>Sorting Speed</p>
						<select v-model="speedFactor" :disabled="inProgress">
							<option value="50">50x</option>
							<option value="10">10x</option>
							<option value="5">5x</option>
							<option value="2">2x</option>
							<option value="1" selected>1x</option>
							<option value="0.5">1/2x</option>
							<option value="0.2">1/5x</option>
							<option value="0.1">1/10x</option>
							<option value="0.02">1/50x</option>
						</select>
					</div>
				</div>
				<div class="sub-menu">
					<div @click="bubbleSort">Bubble Sort</div>
					<div @click="insertionSort">Insertion Sort</div>
					<div @click="selectionSort">Selection Sort</div>
					<div @click="heapSort">Heap Sort</div>
					<div @click="quickSort">Quick Sort</div>
					<div @click="mergeSort">Merge Sort</div>
				</div>
			</div>
		</div>
		<div class="array-container">
			<div v-for="(value, index) in array" class="array-bar" :key="index" :style="getStylesForBar(value)"></div>
		</div>
	</div>
</template>

<script>
	import * as Algorithms from './sortingAlgorithms.js';

	const MAIN_COLOR = 'pink';
	const CHECK_COLOR = '#4a9bc4';
	const SWAP_COLOR = '#ff250f';
	const SORTED_COLOR = 'green';
	const PIVOT_COLOR = 'purple';

	export default {
		data(){
			return {
				array: [],
				inProgress: false,
				arraySize: 30,
				speedFactor: 1
			}
		},
		methods: {
			bubbleSort(){
				let animations = Algorithms.bubbleSortAlgorithm(this.array.slice());
				this.helperMethod(animations);
			},

			insertionSort(){
				let animations = Algorithms.insertionSortAlgorithm(this.array.slice());
				this.helperMethod(animations);
			},

			selectionSort(){
				let animations = Algorithms.selectionSortAlgorithm(this.array.slice());
				this.helperMethod(animations);
			},

			mergeSort(){
				let animations = Algorithms.mergeSortAlgorithm(this.array.slice());
				this.helperMethod(animations);
			},

			quickSort(){
				let animations = Algorithms.quickSortAlgorithm(this.array.slice());
				this.helperMethod(animations, true);
			},

			heapSort(){
				let animations = Algorithms.heapSortAlgorithm(this.array.slice());
				this.helperMethod(animations);
			},

			helperMethod(animation, withPivot = false){
				if(this.inProgress) return;
				this.inProgress = true;
				this.resetColors();
				let arrayBars = document.getElementsByClassName('array-bar');
				let timeout = this.animationSpeed;
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

			arraySizeChanged(e){
				this.arraySize = e.target.value;
				this.resetArray();
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

			getStylesForBar(value){
				let windowWidth = (window.innerWidth * 0.7);
				let width = this.arraySize == 4 ?  200 : Math.floor(windowWidth/this.arraySize);
				let margin = Math.ceil(200/this.arraySize);
				return {
					'margin-right': margin + 'px',
					width: width + 'px',
					height: value + 'px',
				}
			}
		},
		computed: {
			animationSpeed(){
				return Math.floor(3200/this.arraySize)/this.speedFactor;
			},

			disableMenu(){
				if(this.inProgress){
					return {cursor: 'not-allowed'}
				}
			}
		},
		mounted(){
			this.resetArray();
		}
	}
</script>
