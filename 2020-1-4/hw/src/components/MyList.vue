<template>
     <li>
         <!-- {{val}} -->
    <!-- :class="{
            completed:val.checked,
            editing:val.onoff
        }"  -->
        <div class="view">
            <input 
                class="toggle" 
                type="checkbox"
                :checked="val.checked"
                @change="checkedChange"
            >
            <label>{{pv.txt}}</label>
            <button 
                class="destroy"
            ></button>
        </div>
        <input 
            class="edit"
        />
    </li>
</template>

<script>
    export default {
        props:{
            pv:{
                type:Object,
                required:true
            }
        },
        data(){
            return {
                val:Object.assign({},this.pv)
            }
        },
        methods: {
            checkedChange(ev){
                const {checked} = ev.target;
                const {id} = this.val;
                this.val.checked = checked;
                this.$emit('cc',id,checked);
            }
        },
    }
</script>

<style scoped>

</style>