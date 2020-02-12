import React,{Suspense,lazy} from 'react';
function LazyComponent(Component) {
    return class extends React.Component {
        render(){
            const {props} = this;
            return (
                <>
                    <Suspense fallback={<div>loading...</div>}>
                        <Component {...props}/>
                    </Suspense>
                </>
            )
        }
    }
}

export default function(Component){
    return LazyComponent( lazy(Component) )
}