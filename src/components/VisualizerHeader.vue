<template>
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
                    <select @input="speedFactorChanged" :disabled="inProgress">
                        <option v-for="option in speedOptions"
                                :value="option.value"
                                :selected="option.value === speedFactor"
                        >{{ option.stringToShow}}</option>
                    </select>
                </div>
            </div>
            <div class="sub-menu">
                <div @click="startAlgorithm" v-for="algorithm in algorithms">{{ algorithm }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VisualizerHeader",
        props: [
            'inProgress', 'speedFactor', 'arraySize'
        ],
        data(){
            return {
                algorithms: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Quick Sort', 'Merge Sort'],
                speedOptions: [
                    {value: 50, stringToShow: '50x'},
                    {value: 10, stringToShow: '10x'},
                    {value: 5, stringToShow: '5x'},
                    {value: 2, stringToShow: '2x'},
                    {value: 1, stringToShow: '1x'},
                    {value: 0.5, stringToShow: '1/2x'},
                    {value: 0.2, stringToShow: '1/5x'},
                    {value: 0.1, stringToShow: '1/10x'},
                    {value: 0.02, stringToShow: '1/50x'},
                ]
            }
        },
        methods: {
            startAlgorithm(e){
                this.$emit('startAlgorithm', e.target.innerText);
            },
            resetArray(){
                this.$emit('resetArray')
            },
            arraySizeChanged(e){
                this.$emit('arraySizeChanged', e.target.value)
            },
            speedFactorChanged(e){
                this.$emit('speedFactorChanged', e.target.value)
            }
        },
        computed: {
            disableMenu(){
                if(this.inProgress){
                    return {cursor: 'not-allowed'}
                }
            }
        }
    }
</script>