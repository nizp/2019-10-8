import React from 'react';
class AbChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt:''
        };
    }
    componentDidMount(){
        /*
            params.sid -> 1
            
            /song?sid=1 => 稻香.MP3

        */
        //请求这个对象
        const {match:{params}} = this.props;
        console.log(1111)
        setTimeout(()=>{
            let obj = {
                1:'稻香.MP3',
                2:'夜曲.MP3'
            }
            this.setState({txt:obj[params.sid]})
        },1000)
    }
    render() {
        const {txt} = this.state;
        return (
            <>
              <p>
                已经下载到 <i>{txt}</i>
              </p>
            </>
        );
    }
}

export default AbChild;
