//  栈类
function Stack() {
    this.data = [];
    this.top = -1;

    this.push = (element)=> {
        this.data[++this.top] = element;
    };
    this.pop = ()=> {
        if(this.top === -1){
            return null;
        }
        this.top--;
        return this.data.pop();
    };
    this.getTop = ()=> {
        return this.data[this.top - 1];
    };

    this.size = ()=> {
        return top+1;
    };
    this.clear = ()=> {
        this.data = [];
        this.top = -1;
    };
}