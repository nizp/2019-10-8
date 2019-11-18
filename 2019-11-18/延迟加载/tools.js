class Tools {
        /*
            let t1 = new Tools;
            let {l,t} = t1.position(box2);
            console.log(l,t);


            position(元素)

            返回一个对象 {
                l:left,
                t:top

            }
        */
        position(nowEle){
            let l = 0;
            let t = 0;
            let cl = nowEle.clientLeft;
            let ct = nowEle.clientTop;
            //只要有当前这个元素就一直循环
            while(nowEle){
                l += (nowEle.offsetLeft + nowEle.clientLeft);
                t += (nowEle.offsetTop + nowEle.clientTop);
                nowEle = nowEle.offsetParent; //把本次的定位父级变成，下次循环的当前元素。
            }
            l = l - cl;
            t = t - ct;

            return {
                l,
                t
            }
        }
    }


   