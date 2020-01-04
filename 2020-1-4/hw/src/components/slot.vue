<template>
    <div>
        <p>这个是插槽</p>
        <ul>
            <li 
                v-for="(val,key) in data"
            >
                <slot 
                    :id="val.id"
                    :n="val.key"
                    :age="val.age"
                    name="list"
                ></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:['data']
    }
</script>

<style scoped>

</style>