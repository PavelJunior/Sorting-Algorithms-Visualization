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
                                :value="option"
                                :selected="option === speedFactor"
                        >{{ speedOptionToShow(option) }}</option>
                    </select>
                </div>
            </div>
            <div class="sub-menu">
                <div @click="startAlgorithm" v-for="(func, name) in algorithms">{{ name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VisualizerHeader",
        props: [
            'inProgress', 'speedFactor', 'arraySize', 'algorithms','speedOptions'
        ],
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
            },
            speedOptionToShow(value){
                if(value < 1){
                    value = '1/' + 1 / value ;
                }
                return value + 'x';
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