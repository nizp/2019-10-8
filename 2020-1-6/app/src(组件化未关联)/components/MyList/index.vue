<template>
    <section class="main">
        <input 
            class="toggle-all" 
            type="checkbox" 
            v-model="all"
        >
        <ul class="todo-list">
            <List 
                v-for="(val,key) in ary" 
                :data="val"
                :key="val.id"
                @rm="rmdata"
                @rep="changeOnoff"
                @listCV="changeTxt"
                @off="changeOnoff"
            />
        </ul>
    </section>
</template>

<script>
    import List from './list';
    export default {
        data(){
            return {
                ary:[
                    {
                        txt:'今天下雪了',
                        id:0,
                        checked:true,
                        onoff:false
                    },
                    {
                        txt:'伊朗Vs美国',
                        id:1,
                        checked:true,
                        onoff:false
                    }
                ]
            }
        },
        methods:{
            rmdata(id){
                this.ary = this.ary.filter(item=>item.id !== id);
            },
            changeOnoff(id,b){
                this.ary.forEach(item=>{
                    if(item.id === id){
                        item.onoff = b;
                    }
                })
            },
            changeTxt(val,id){
                this.ary.forEach(item=>{
                    if(item.id === id){
                        item.txt = val;
                        item.onoff = false;
                    }
                });
            }
        },
        computed:{
            all:{
                get(){
                    return this.ary.length && this.ary.every(item=>item.checked);
                },
                set(newVal){
                    this.ary.forEach(item=>item.checked = newVal);
                }
            }
        },
        components:{
            List
        }
    }
</script>

<style scoped>
.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}
label[for='toggle-all'] {
	display: none;
}

.toggle-all {
	position: absolute;
	top: -55px;
	left: -12px;
	width: 60px;
	height: 34px;
	text-align: center;
	border: none; /* Mobile Safari */
}

.toggle-all:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>