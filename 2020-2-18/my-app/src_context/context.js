import React from 'react'
export default React.createContext();

/*
    React.createContext()

        返回2个对象
            Consumer  消费者
                <Consumer>
                    {
                       (val)=>{
                            val就为Provider中的value
                       } 
                    }
                </Consumer>
            Provider  供应者
                Provider 传递数据一定是用value

            可以在组件上绑定一个静态的属性叫做contextType。让这个属性等于React.createContext
            这样一来，就可以通过this.context去取Provider中的数据了
*/


// console.log()