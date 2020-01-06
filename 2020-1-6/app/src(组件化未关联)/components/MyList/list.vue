<template>
   <li :class="{editing:data.onoff,completed:data.checked}">
        <div class="view">
            <input 
                class="toggle" 
                type="checkbox"
                v-model="data.checked"
            >
            <label
                @dblclick="replace"
            >{{data.txt}}</label>
            <button 
                class="destroy"
                @click="rm"
            ></button>
        </div>
        <input 
            class="edit"
            :value="data.txt"
            v-focus
            @blur="blur"
            ref="rename"
            @keyup.esc="escfn"
        />
    </li>
</template>

<script>
    export default {
        props:{
            data:{
                type:Object,
                required:true
            }
        },
        methods:{
            rm(){
                this.$emit('rm',this.data.id);
            },
            replace(){
                this.$emit('rep',this.data.id,true);
            },
            blur(){
                const {value} = this.$refs.rename;
                const {id,txt} = this.data;
                let val = value.trim();
                if(val && val != txt){
                    this.$emit('listCV',val,id);
                }else{
                    this.$emit('off',id,false);
                }
            },
            escfn(){
                const {id,txt} = this.data;
                this.$emit('off',id,false);
            }
        },
        directives:{
            focus:{
                componentUpdated(el){
                    el.select();
                }
            }
        }
    }
</script>

<style scoped>

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: 506px;
	padding: 13px 17px 12px 17px;
	margin: 0 0 0 2px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 12px;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle:after {
	content: url('../../assets/1.png');
}

.todo-list li .toggle:checked:after {
	content: url('../../assets/2.png');
}

.todo-list li label {
	white-space: pre-line;
	word-break: break-all;
	padding: 15px 60px 15px 15px;
	margin-left: 45px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}
</style>