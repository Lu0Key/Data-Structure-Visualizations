//  栈类
function Stack() {
    this.data = [];
    this.top = -1;

    this.push = (element)=> {
        this.data[++this.top] = element;
    };
    this.pop = ()=> {
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

// 队列类
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

// 二叉树类
function Tree(data) {
    this.data = data;
    this.x;
    this.y;
    this.parent    = null;
    this.circle    = null;
    this.leftTree  = null;
    this.rightTree = null;
    this.leftLine  = null;
    this.rightLine = null;
    this.color     = null;
    this.text      = null;
    
    this.drawTreeNode = ()=>{
        this.circle = two.makeCircle(this.x,this.y,RADIUS);
        this.circle.stroke = COLORS.BLACK;
        this.circle.linewidth = 1;
        this.text = new Two.Text(this.data+"",this.x,this.y,"normal");
        two.add(this.text);
        two.update();
    };

    this.drawTreeBranch = ()=>{
        if(this.leftLine!=null){this.leftLine.remove();}
        if(this.rightLine!=null){this.rightLine.remove();}
        if(this.leftTree != null){
            this.leftLine = two.makeLine(this.x,this.y,this.leftTree.x,this.leftTree.y);
            this.leftLine.stroke = COLORS.BLACK;
            this.leftLine.linewidth = 1;
        }
        if(this.rightTree != null){
            this.rightLine = two.makeLine(this.x,this.y,this.rightTree.x,this.rightTree.y);
            this.rightLine.stroke = COLORS.BLACK;
            this.rightLine.linewidth = 1;
        }
        two.update();
    };

    // 获得树的深度
    this.depth = ()=> {
        let leftDepth,rightDepth;
        if(this.leftTree == null){
            leftDepth = 0;
        }else{
            leftDepth = this.leftTree.depth();
        }
        if(this.rightTree == null){
            rightDepth = 0;
        }else{
            rightDepth = this.rightTree.depth();
        }

        return 1+Math.max(leftDepth,rightDepth);
    };

    this.flash = ()=>{
        let timer = setInterval(()=>{
            this.circle.linewidth +=0.1;
            this.circle.stroke = "orange";
            two.update();
            if(this.circle.linewidth>=3){
                
                two.update();
                let timer2 = setInterval(()=>{
                    this.circle.linewidth -=0.1;
                    this.circle.stroke = COLORS.BLACK;
                    if(this.circle.linewidth<=1){
                        this.circle.linewidth = 1;
                        two.update();
                        clearInterval(timer2);
                        clearInterval(timer);
                        return true;
                    }
                },20)
            }
        },20);
        setTimeout(()=>{
            return true;
        },800);
    }

    this.removeLeftLine = ()=>{
        if(this.leftLine  != null){this.leftLine.remove();}
    }

    this.removeRightLine = ()=>{
        if(this.rightLine != null){this.rightLine.remove();}
    }
    this.removeLine = ()=>{
        this.removeLeftLine();
        this.removeRightLine();
    }

    this.removeCircle = ()=>{
        if(this.circle != null){this.circle.remove();}
        if(this.text   != null){this.text.remove();}
    }

    this.remove = ()=>{
        this.removeLeftLine();
        this.removeCircle();
    }
}


// ---------- start ----------
// ---------- 常量  ----------
const COLORS = {
    RED : "#9c0c13",
    BLACK : "#29363B"
}
const RADIUS = 20;
var params = {
    width:document.documentElement.clientWidth-300,
    height:document.documentElement.clientHeight
};
// ---------- 常量 -----------
// ---------- end  ----------

var treeArray = null;
var root = null;

let container = document.querySelector(".container");


// 生成画布
let two = new Two(params).appendTo(container);
two.update();

$("#testButton").click(()=>{
    
});

$("#searchButton").click(()=>{findNode();});

function findNode() {
    if(root == null){
        console.log("树为空");
        return;
    }
    let searchValue = $("#searchInput")[0].value;
    if(searchValue === ""||isNaN(searchValue)){console.log("请输入数字");return;}
    searchValue -=0;
    console.log(searchValue === "");
    let queue = new Queue();
    let flag = false;
    preorder(root,queue);
    let node = null;
    let promise = new Promise((resolve, reject)=>{
        let timer = setInterval(()=>{
            node = queue.pop();
            node.flash();
            if(node.data === searchValue){
                flag = true;
                resolve();
                window.clearInterval(timer);
                
            }
            if(queue.length == 0){
                resolve();
                window.clearInterval(timer);
            }
        },800);
    });

    promise.then(()=>{
        if(flag){
            console.log("找到了");
            let count = 0;
            timer = setInterval(()=>{
                node.flash();
                count++;
                if(count>=3) window.clearInterval(timer);
            },800);
        }else{
            console.log("没找到");
        }
    });
    
}

$("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});

// ------ start ---------------
// ------ 遍历   --------------
function order(str) {
    if(root == null) {
        console.log("树为空");
        return;
    }
    console.log(str);
    let queue = new Queue();
    if(str === "前序遍历"){preorder(root,queue);}
    if(str === "中序遍历"){inorder(root,queue);}
    if(str === "后序遍历"){postorder(root,queue);}
    // console.log(queue);
    let timer = setInterval(()=>{
        let node = queue.pop();
        node.flash();
        // console.log(node.data);
        if(queue.length == 0){
            window.clearInterval(timer);
        }
    },800);
}
// 前序遍历
function preorder(node,queue) {
    if(node == null) return;
    console.log(node.data)
    queue.push(node);
    preorder(node.leftTree,queue);
    preorder(node.rightTree,queue);
}
// 中序遍历
function inorder(node,queue) {
    if(node == null) return;
    inorder(node.leftTree,queue);
    queue.push(node);
    inorder(node.rightTree,queue);
}
// 后续遍历
function postorder(node,queue) {
    if(node == null) return;
    postorder(node.leftTree,queue);
    postorder(node.rightTree,queue);
    queue.push(node);
}
//------ 遍历 -------
//------ end  ------





// let line = two.makeLine(20,20,two.width/2,100);
// line.stroke = COLORS.BLACK;
// line.linewidth = 1;

// let circle = two.makeCircle(two.width/2,100,40);
// circle.stroke = COLORS.BLACK;
// circle.linewidth = 1;

// let text =new Two.Text("10",two.width/2,100,"normal");
// text.stroke = COLORS.BLACK;
// text.linewidth =1;


// console.log(line._collection[1])
// console.log(line.translation)

// 文本要add到two中
// two.add(text);


// console.log(circle.translation.x);

// 当页面改变大小的时候改变画布的大小
window.onresize = function(){
    params = {
        width:document.documentElement.clientWidth-300,
        height:document.documentElement.clientHeight
    };
    two.width = document.documentElement.clientWidth-300;
    two.height = document.documentElement.clientHeight;
    two.update();
    drawTree();
}

// let timer = setInterval(()=>{
//     circle.translation.set(circle.translation.x+100/100,circle.translation.y+100/100);
//     // console.log(circle.translation);
//     line._collection[1].x=line._collection[1].x+100/100;
//     line._collection[1].y=line._collection[1].y+100/100;
//     text.translation.set(text.translation.x+100/100,text.translation.y+100/100);
//     two.update();
//     if(circle.translation.x>=500){
//         clearInterval(timer);
//         two.update();
//     }
// },10)



// ---------- start ----------
// ---------- 画树  ----------
$('#drawTree').click(drawTree);
function drawTree() {
    two.clear();
    let input = $("#treeArrayInput")[0];
    let inputValue = input.value;
    // 如果判断有问题直接停止函数
    if(!judgeStr2Array(inputValue)){
        console.log(inputValue);
        return;
    }
    initTreeData();
    drawTreeImage();
}

//---------画树的辅助函数------------------
function judgeStr2Array(inputValue) {
    // test
    let stack = new Stack();
    // end
    
    let valueLength = inputValue.length;
    if(valueLength<1){
        ErrorMessage(1);
        return false;
    }
    if(inputValue[0]!='[' || inputValue[valueLength-1]!=']' ){
        ErrorMessage(2);
        return false;
    }


    for(let i = 1;i<valueLength-1;i++){

        if(inputValue[i]=='['){
            stack.push(inputValue[i]);
        }

        if(inputValue[i]==']'){
            let a = stack.pop();
            if(!isNaN(a)){a = stack.pop();}
            if(a=='['){
                if(i<valueLength-1&&inputValue[i+1]==','){
                    i++;
                    continue;
                }
            }else{
                ErrorMessage(3);
                return false;
            }
        }
        
        if(inputValue[i]==','){
            let a = stack.pop();
            if(isNaN(a)){
                ErrorMessage(4);
                return false;
            }
            if(i<valueLength-1&&(inputValue[i+1]=='['||(inputValue[i+1]-'0'>=0||inputValue[i+1]-'0'<=9))){
                ;
            }else{
                ErrorMessage(5);
                return false;
            }
        }


        if(inputValue[i]-'0'>=0&&inputValue[i]-'0'<=9){
            let a = inputValue[i]-'0';
            i++;
            while(inputValue[i]-'0'>=0&&inputValue[i]-'0'<=9&&i<valueLength){
                //  这里容易让人误会，换一种写法
                // a = a+inputValue[i]-'0';
                a = a*10+(inputValue[i]-'0');
                i++;
            }
            //遇到不对的了，要退回去一位
            i--;
            stack.push(a);
        }

        if(
            inputValue[i]!='['&&
            inputValue[i]!=']'&&
            !(inputValue[i]-'0'>=0&&inputValue[i]-'0'<=9)&&
            inputValue[i]!=','){
            ErrorMessage(6);
            return false;
        }
    }

    treeArray = JSON.parse(inputValue);
    if(!judgeArray(treeArray)){
        treeArray = null;
        ErrorMessage(7);
        return false;
    }
    console.log("正确");
    return true;
    
}

// 判断数组长度是否合法
function judgeArray(array) {
    if(array.length == 0) {
        return true;
    }
    if(array.length == 3){
        let a = true;
        if(isNaN(array[0])){
            a = judgeArray(array[0]);
        }
        if(isNaN(array[1])){
            a = a&&judgeArray(array[1]);
        }
        if(isNaN(array[2])){
            a = a&&judgeArray(array[2]);
        }
        return a;
    }else{
        return false;
    }
}

function initTreeData() {
    if(treeArray == null||treeArray.length === 0){
        root = null;
        ErrorMessage("树为空");
        return;
    }
    root = createTree(treeArray);
    let r = 50;
    let depth = root.depth();
    let distant = (r/2+10)*Math.pow(2,depth-2);
    setPosition(root,params.width/2,100,distant);
}

function createTree(array) {
    if(array.length == 0) return null;
    let Node = new Tree(array[0]);
    if(array.length == 3){
        Node.leftTree = createTree(array[1]);
        Node.rightTree = createTree(array[2]);
    }
    return Node;
}

function setPosition(node,w,h,distant){
    if(node == null) {return;}
    node.x = w;
    node.y = h;
    setPosition(node.leftTree,w-distant,h+100,distant/2);
    setPosition(node.rightTree,w+distant,h+100,distant/2);
};

function drawTreeImage() {
    if(root == null) {
        console.log("数据为空");
        return;
    }
    drawLine(root);
    drawTreeNode(root);
};

function drawLine(node) {
    if(node == null) return ;
    node.drawTreeBranch();
    drawLine(node.leftTree);
    drawLine(node.rightTree);
    
}

function drawTreeNode(node){
    if(node == null) return;
    // ellipse(w, h, r, r);
    // textAlign(CENTER,CENTER);
    // textSize(10);
    // text(node.data,w,h);
    // node.x = w;
    // node.y = h;
    node.drawTreeNode();
    drawTreeNode(node.leftTree);
    drawTreeNode(node.rightTree);
}

//------------- 画树 ----------------
//------------- end ----------------

function ErrorMessage(param) {
    console.log("字符串有误，请检查后重新输入:"+param);
}

// ------ 画二叉搜索树 -------
function drawBSTree() {
    two.clear();
    treeArray = null;
    root = null;
    let inputValue = $("#treeArrayInput")[0].value;
    if(!judgeStr2LinearArray(inputValue)){console.log("请输入正确数组");return;}
    treeArray = JSON.parse(inputValue);
    // initBSTreeData();
    // drawTreeImage();
    insertArray(treeArray);
}

function judgeStr2LinearArray(str) {
    if(str === ""){
        console.log("请输入数组");
        return false;
    }
    let strLength = str.length;
    if(str[0]!='['  ||  str[strLength-1]!=']'){
        console.log("请重新输入正确数组");
        return false;
    }
    
    let stack = new Stack();
    for(let i =1;i<strLength-1;i++){
        if(str[strLength-2]===','){
            return false;
        }

        if(str[i]-'0'>=0&&str[i]-'0'<=9){
            let a = str[i];
            i++;
            while(str[i]-'0'>=0&&str[i]-'0'<=9&&i<strLength-1){
                a = a*10+(str[i]-0);
                i++;
            }
            i--;
            stack.push(a);
        }
    
        if(str[i] === ','){
            let a = stack.pop();
            if(isNaN(a)){return false;}
        }
        if(!(str[i]-'0'>=0&&str[i]-'0'<=9)&&
            str[i]!=','){
            ErrorMessage("请输入正确数组");
            return false;
        }
    }
    return true;
}

// 好像也废弃了
function initBSTreeData() {
    if(treeArray === null||treeArray.length === 0){
        root = null;
        ErrorMessage("树为空");
        return;
    }
    root = null;
    insertArray(treeArray);
    setBSTPosition(root,params.width/2,100);
}

function insertArray(array) {
    for(let i = 0 ;i<array.length;i++){
        insertBSTNode(root,array[i]);
    }
}

// 好像废弃了
function insertNode(node,data){
    if(root === null){
        console.log(data);
        root = new Tree(data);
        return;
    }
    if(node.data>data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
        }else{
            insertNode(node.leftTree,data);
        }
    }else{
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
        }else{
            insertNode(node.rightTree,data);
        }
    }
}

function insertBSTNode(node,data) {
    if(root === null){
        console.log(data);
        root = new Tree(data);
        root.x = params.width/2;
        root.y = 100;
        root.drawTreeNode();
        return;
    }
    // 左边
    if(node.data>data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
            BSTfixup(node.leftTree,"left");
        }else{
            insertBSTNode(node.leftTree,data);
        }
    }else{
    // 右边
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            console.log("rightTree",node);
            node.rightTree.parent = node;
            BSTfixup(node.rightTree,"right");
        }else{
            insertBSTNode(node.rightTree,data);
        }
    }
}

function BSTfixup(node,str) {
    console.log("进了fixup");
    console.log(str);
    
    if(node.parent === root){

        node.parent.remove();
        node.x = node.parent.x+50;
        if(str === "left"){
            node.x = node.parent.x-50;
        }
        node.y = node.parent.y+50;
        node.parent.drawTreeBranch();
        if(node.parent.leftTree !=null && str === "right"){
            node.parent.leftTree.removeCircle();
            node.parent.leftTree.drawTreeNode();
        }
        if(node.parent.rightTree !=null && str === "left"){
            node.parent.rightTree.removeCircle();
            node.parent.rightTree.drawTreeNode();
        }

        node.parent.drawTreeNode();
        node.drawTreeNode();
        node.flash();
        console.log("node:",node);
        return;
    }
    // flag: true  左子树
    //       false 右子树
    let isLeft = node.parent.data < root.data;
    let args={x:1,distant:50};
    let queue = new Queue();
    // 表示是左边
    if(isLeft){
        if(str === "left"){
            node.x = node.parent.x-args.distant;
        }else{
            node.x = node.parent.x;
        }
        args.x = -1;
        preorder(root.leftTree,queue);
    }else{
        // 右边
        if(str === "left"){
            node.x = node.parent.x;
        }else{
            node.x = node.parent.x+args.distant;
        }
        preorder(root.rightTree,queue);
    }
    node.y = node.parent.y+50;
    // 自身要移动的
    let array = [];
    // 自身不移动，线条移动的
    let arrayParents = [];
    // 获取自身要移动的 结点
    while(queue.data.length!=0){
        let a = queue.pop();
        if(isLeft){
            if(a.data < node.data){
                array.push(a);
            }
        }else{
            if(a.data > node.data){
                array.push(a);
            }
        }
    }
    // 获取自身不移动，但是线条要移动的
    for(let i =0;i<array.length;i++){
        
        if(isLeft){
            // 左边比自己大的不移动
            if(array[i].parent.data>node.data){
                arrayParents.push(array[i].parent);
            }
        }else{
            // 右边比自己小的不移动
            if(array[i].parent.data<node.data){
                arrayParents.push(array[i].parent);
            }
        }
    }

    // 先准备好整幅图
    node.parent.remove();
    node.parent.drawTreeBranch();
    node.parent.drawTreeNode();
    if(node.parent.leftTree !=null && str === "right"){
        node.parent.leftTree.removeCircle();
        node.parent.leftTree.drawTreeNode();
    }
    if(node.parent.rightTree !=null && str === "left"){
        node.parent.rightTree.removeCircle();
        node.parent.rightTree.drawTreeNode();
    }

    node.drawTreeNode();
    node.flash();

    // 开始移动
    let promise = new Promise((resolve, reject)=>{
        let timer = setInterval(()=>{
            node.circle.opacity += 0.05;
            // 本身不动，但是线动的
            for(let i =0;i<arrayParents.length;i++){
                // 修改第二个点
                if(isLeft){
                    arrayParents[i].leftLine._collection[1].x += args.x;
                }else{
                    arrayParents[i].rightLine._collection[1].x += args.x;
                }
            }
            // 本身动，线也动的
            for(let i =0;i<array.length;i++){
                // 线动
                if(isLeft){
                    // 左边
                    if(array[i].leftLine != null){
                        array[i].leftLine._collection[0].x += args.x;
                        array[i].leftLine._collection[1].x += args.x;
                    }
                    if(array[i].rightLine != null){
                        array[i].rightLine._collection[0].x += args.x;
                        if(array[i].rightTree.data < node.data){
                            array[i].rightLine._collection[1].x += args.x;
                        }
                    }
                }else{
                    if(array[i].rightLine != null){
                        array[i].rightLine._collection[0].x += args.x;
                        array[i].rightLine._collection[1].x += args.x;
                    }
                    if(array[i].leftLine != null){
                        array[i].leftLine._collection[0].x += args.x;
                        if(array[i].leftTree.data > node.data){
                            array[i].leftLine._collection[1].x += args.x;
                        }
                    }
                }
                
                // 本身动
                array[i].x += args.x;
                array[i].circle.translation.set(array[i].x,array[i].y);
                array[i].text.translation.set(array[i].x,array[i].y);
                two.update();
            }

            if(Math.abs(node.x-node.parent.x)>=args.distant){
                node.circle.opacity = 1;
                window.clearInterval(timer);
                resolve();
            }
        },20);
    })

    promise.then(()=>{
        console.log("移动完成");
    });
}


function setBSTPosition(node,w,h){
    if(node == null) {return;}
    node.x = w;
    node.y = h;
    setBSTPosition(node.leftTree,w-50,h+50);
    setBSTPosition(node.rightTree,w+50,h+50);
};

// 查找结点
function findBSTNode() {
    if(root == null){
        console.log("树为空");
        return;
    }
    let searchValue = $("#searchInput")[0].value;
    if(searchValue === ""||isNaN(searchValue)){console.log("请输入数字");return;}
    searchValue -=0;
    console.log(searchValue);
    let flag = false;
    let existence = false;
    let node = root;
    console.log(!flag&&(!existence))
    let queue = new Queue();
    while(!flag&&(!existence)){
        queue.push(node);
        if(node.data === searchValue){
            existence = true;
        }
        if(node.data > searchValue){
            if(node.leftTree === null){
                flag = true;
            }
            node = node.leftTree;
        }
        if(node.data < searchValue){
            if(node.rightTree === null){
                flag = true;
            }
            node = node.rightTree;
        }
    }

    let promise = new Promise((resolve, reject)=>{
        let timer = setInterval(()=>{
            node = queue.pop();
            node.flash();
            if(node.data === searchValue){
                resolve();
                window.clearInterval(timer);
                
            }
            if(queue.length == 0){
                resolve();
                window.clearInterval(timer);
            }
        },800);
    });

    promise.then(()=>{
        console.log("existence:",existence);
        if(existence){
            console.log("找到了");
            let count = 0;
            timer = setInterval(()=>{
                node.flash();
                count++;
                if(count>=3) window.clearInterval(timer);
            },800);
        }else{
            console.log("没找到");
        }
    });
}




