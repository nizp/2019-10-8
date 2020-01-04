const ppa = {
    template:'#ppa',
    created(){
        /*
            this.$parent拿到父级的实例
            可以通过实例获取父级的数据
        */
        console.log(this.$parent.num);
    },
    inject:['ary2']
}