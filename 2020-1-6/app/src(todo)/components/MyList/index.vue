<template>
    <section class="main">
        <!-- {{listdata}},数据 -->
        <input 
            class="toggle-all" 
            type="checkbox" 
            v-model="all"
        >
        <ul class="todo-list">
            <List 
                v-for="(val,key) in listdata" 
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
        props:{
            listdata:{
                //如果默认值要为一个对象，那么default要为一个函数，函数要return默认数据
                default:function(){
                    return [
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
            }
        },
        data(){
            return {
            //     ary:this.listdata
            }
        },
        methods:{
            rmdata(id){
                // this.listdata = this.listdata.filter(item=>item.id !== id);
                this.$emit('crm',id);
            },
            changeOnoff(id,b){
                this.listdata.forEach(item=>{
                    if(item.id === id){
                        item.onoff = b;
                    }
                })
            },
            changeTxt(val,id){
                this.listdata.forEach(item=>{
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
                    return this.listdata.length && this.listdata.every(item=>item.checked);
                },
                set(newVal){
                    this.listdata.forEach(item=>item.checked = newVal);
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