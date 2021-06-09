function Queue() {
    this.data = [];
    this.length = 0;

    this.pop = ()=> {
        if(this.length>0){
            this.length--;
            return this.data.shift();
        }
    }

    this.push = (param)=> {
        this.data[this.length++] = param;
    }
}