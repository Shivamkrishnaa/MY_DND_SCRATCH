
function json(r){
    return JSON.parse(JSON.stringify(r))
    }
    function customLogicToFindBlock(x, id, index){
        // var x =[1,[2,[3,[4]]]];
        // var id = 3;
        var ans = null;
        var ans2 = "";
        var count = 0;
        // for(var i=0; i<index; i++){
            while(true){
            var [m,n] = x;
            if(m == id){
                ans = x;
                break;
            } else {
                if(count != 0) {
                    ans2 = ans2.concat(",")
                }
                ans2 = ans2.concat("[",m);
                // if(n.length == 2) {ans2 = ans2.concat}
                x = n;
                count++;
            }
        }
        while(count>0){
            ans2 = ans2+"]";
            count--;
        }
        console.log(JSON.stringify(ans), (ans2));
        return [ans, ans2 && JSON.parse(ans2)];
        }
        customLogicToFindBlock([1,[2,[3,[4]]]], 4);
        customLogicToFindBlock([1,[2,[3,[4]]]], 3);
        customLogicToFindBlock([1,[2,[3,[4]]]], 2);
        customLogicToFindBlock([1,[2,[3,[4]]]], 1);