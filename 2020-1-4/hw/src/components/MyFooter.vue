<template>
    <footer class="footer">
        <span class="todo-count">
            <strong>0</strong>
            <span>条未选中</span>
        </span>
        <ul 
            class="filters"
        >
            <li>
                <a 
                    href="#/all" 
                    class="selected"
                    
                >全部</a>
            </li>
            <li>
                <a 
                    href="#/unchecked" 
                    
                    class=""
                >未选中</a>
            </li>
            <li>
                <a 
                    href="#/checked"
                    class=""
                >已选中</a>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>