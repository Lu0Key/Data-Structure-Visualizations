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

    this.isBalance = ()=>{
        let leftDepth = 0;
        let rightDepth = 0;
        if(this.leftTree!=null){
            leftDepth = this.leftTree.depth();
        }
        if(this.rightTree!=null){
            rightDepth = this.rightTree.depth();
        }
        if(Math.abs(leftDepth-rightDepth)>1){
            return false;
        }else{
            return true;
        }
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
var isAnimation = false;

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
        console.log("array[0]",array[0]);
        console.log("isNaN(array[0])",isNaN(array[0]))
        let a = true;
        if(isNaN(array[0])){
            a = false;
        }
        if(Array.isArray(array[1])){
            a = a&&judgeArray(array[1]);
        }else{
            a = false;
        }
        if(Array.isArray(array[2])){
            a = a&&judgeArray(array[2]);
        }else{
            a = false;
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
function drawBSTree(params) {
    two.clear();
    treeArray = null;
    root = null;
    let inputValue = $("#treeArrayInput")[0].value;
    if(!judgeStr2LinearArray(inputValue)){console.log("请输入正确数组");return;}
    treeArray = JSON.parse(inputValue);
    insertArray(treeArray,params);
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

function insertArray(array,type) {
    for(let i = 0 ;i<array.length;i++){
        if(type === "BST"){
            insertBSTNode(root,array[i]);
        }
        if(type === "AVL"){
            insertAVLTreeNode(array[i]);
        }
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

function insertBSTNode(node,data,treeType) {
    if(root === null){
        console.log(data);
        root = new Tree(data);
        root.x = params.width/2;
        root.y = 100;
        root.drawTreeNode();
        isAnimation = false;
        return root;
    }
    // 比自身更小的都放左边
    if(node.data>data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
            console.log("treeType",treeType);
            BSTfixup(node.leftTree,"left",treeType);
        }else{
            insertBSTNode(node.leftTree,data,treeType);
        }
    }else{
    // 大于等于自身的才放右边
    // 右边
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
            console.log("treeType",treeType);
            BSTfixup(node.rightTree,"right",treeType);
        }else{
            insertBSTNode(node.rightTree,data,treeType);
        }
    }
}

function BSTfixup(node,str,treeType) {
    console.log("treeType",treeType);
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
        isAnimation = false;
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
        if(treeType === "AVL"){
            console.log("开始平衡移动");
            AVLTreeFixup(node,"");
        }
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


function insertAVLTreeNode(data) {
    insertBSTNode(root,data,"AVL");
}

function AVLTreeFixup(node,str) {
    console.log("进入AVL平衡调整");
    // 放查询节点的
    let queue = new Queue();
    let data = node.data;
    let p = node;
    let tempNode;
    while(p!=null&&p.isBalance()){
        queue.push(p);
        p = p.parent;
    }
    // 表明一直到 root 都是平衡的
    
    let promise = new Promise((resolve, reject)=>{
        let timer = setInterval(()=>{
            tempNode = queue.pop();
            tempNode.flash();
            if(queue.length == 0){
                resolve();
                window.clearInterval(timer);
            }
        },800);
    });

    promise.then(()=>{
        if(p === null){
            isAnimation = false;
            console.log("平衡！");
        }else if(!p.isBalance()){
            if(p.data > node.data){
                // 小于自身一定是自身的左子树
                // 因此p的左子树一定不为空

                if(p.leftTree.data > node.data){
                    // 一定是左子树的左子树
                    // 右旋
                    console.log("左左");
                    AVLLLR(p);
                }else{
                    // 左子树的右子树
                    // 右旋-左旋
                    console.log("左右");
                    
                }
            }else{
                // 右子树
                if(p.rightTree.data > node.data){
                    // 右子树的左子树
                    // 左旋-右旋
                    console.log("右左");
                    AVLLRR(p);
                }else{
                    // 右子树的右子树
                    // 左旋
                    console.log("右右");
                    AVLRRR(p);
                }
            }    
        }
        return;
    });
}

// AVL tree left-left rotation
function AVLLLR(p) {
    let c = p.leftTree;
    let pIsRoot = p.parent === null ? true : false;
    console.log("p is root?",pIsRoot);
    // p的右边子树的所有结点，需要下降
    let queueRight = new Queue();
    preorder(p.rightTree,queueRight);
    // c的左边子树的所有结点，需要上升
    let queueLeft = new Queue();
    preorder(c.leftTree,queueLeft);
    // 起始位置
    let pStartPositionX = p.x;
    let pStartPositionY = p.y;
    let cStartPositionX = c.x;
    let cStartPositionY = c.y;

    // 交换线权
    let tempLine = c.rightLine;
    c.rightLine = p.leftLine;
    p.leftLine = tempLine;

    // 交换地位
    let tempTree = c.rightTree; 
    c.parent = p.parent;
    p.parent = c;
    c.rightTree = p;
    p.leftTree = tempTree;
    if(p.leftTree != null){
        p.leftTree.parent = p;
    }

    // 交换 C rightLine 的头尾
    // 这样c的rightLine 一定存在，因此需要线交换头尾
    let tempValue = c.rightLine._collection[0].x;
    c.rightLine._collection[0].x = c.rightLine._collection[1].x;
    c.rightLine._collection[1].x = tempValue;
    tempValue = c.rightLine._collection[0].y;
    c.rightLine._collection[0].y = c.rightLine._collection[1].y;
    c.rightLine._collection[1].y = tempValue;


    let NodeLineDistance;
    let cRightQueue = new Queue();
    if(p.leftLine != null){
        console.log("p.leftTree",p.leftTree.data);
        NodeLineDistance = pStartPositionX - p.leftLine._collection[0].x;
        preorder(p.leftTree,cRightQueue);
        p.removeCircle();
        p.drawTreeNode();
    }

    if(pIsRoot){
        root = c;
    }else{
        if(c.parent.data > c.data){
            c.parent.leftTree = c;
        }else{
            c.parent.rightTree = c;
        }
    }

    console.log("queueLeft",queueLeft);

    let args;
    if(pIsRoot){
        args = {
            x:(pStartPositionX-cStartPositionX)/50,
            y:(pStartPositionY-cStartPositionY)/50
        }
    }else{
        args = {
            x:0,
            y:-50/50
        }
    }
    promise = new Promise((resolve,reject)=>{
        console.log("进入promise");
        
        let timer = setInterval(()=>{
            if(!pIsRoot){
                if(c.data < c.parent.data){
                    // 说明是父节点的左子树
                    c.parent.leftLine._collection[1].x -= (pStartPositionX-cStartPositionX)/50;
                }else{
                    c.parent.rightLine._collection[1].x -= (pStartPositionX-cStartPositionX)/50;
                }
            }
            //降低高度，对应 y 增加
            console.log("刷新一次");
            p.x += args.x;
            p.y -= args.y;
            p.circle.translation.set(p.x,p.y);
            p.text.translation.set(p.x,p.y);
            if(p.rightLine != null){
                p.rightLine._collection[0].x += args.x;
                p.rightLine._collection[0].y -= args.y;
                p.rightLine._collection[1].x += args.x;
                p.rightLine._collection[1].y -= args.y;
            }
            // p 的右边的所有
            for(let i =0;i<queueRight.data.length;i++){
                queueRight.data[i].x += args.x;
                queueRight.data[i].y -= args.y;
                queueRight.data[i].circle.translation.set(queueRight.data[i].x,queueRight.data[i].y);
                queueRight.data[i].text.translation.set(queueRight.data[i].x,queueRight.data[i].y);
                if(queueRight.data[i].leftLine != null){
                    queueRight.data[i].leftLine._collection[0].x = queueRight.data[i].x;
                    queueRight.data[i].leftLine._collection[0].y = queueRight.data[i].y;
                    queueRight.data[i].leftLine._collection[1].x = queueRight.data[i].leftTree.x;
                    queueRight.data[i].leftLine._collection[1].y = queueRight.data[i].leftTree.y;
                }
                if(queueRight.data[i].rightLine != null){
                    queueRight.data[i].rightLine._collection[0].x = queueRight.data[i].x;
                    queueRight.data[i].rightLine._collection[0].y = queueRight.data[i].y;
                    queueRight.data[i].rightLine._collection[1].x = queueRight.data[i].rightTree.x;
                    queueRight.data[i].rightLine._collection[1].y = queueRight.data[i].rightTree.y;
                }
            }
            // 升高高度, c的左子树一定存在，因此c的 leftLine 一定存在，
            // 对应 y减少
            c.x += args.x;
            c.y += args.y;
            c.circle.translation.set(c.x,c.y);
            c.text.translation.set(c.x,c.y)
            c.leftLine._collection[0].x = c.x;
            c.leftLine._collection[0].y = c.y;
            c.leftLine._collection[1].x = c.leftTree.x;
            c.leftLine._collection[1].y = c.leftTree.y;
            c.rightLine._collection[0].x = c.x;
            c.rightLine._collection[0].y = c.y;
            c.rightLine._collection[1].x = c.rightTree.x;
            c.rightLine._collection[1].y = c.rightTree.y;

            for(let i =0;i<queueLeft.data.length;i++){
                queueLeft.data[i].x += args.x;
                queueLeft.data[i].y += args.y;
                queueLeft.data[i].circle.translation.set(queueLeft.data[i].x,queueLeft.data[i].y);
                queueLeft.data[i].text.translation.set(queueLeft.data[i].x,queueLeft.data[i].y);
                if(queueLeft.data[i].leftLine != null){
                    queueLeft.data[i].leftLine._collection[0].x = queueLeft.data[i].x;
                    queueLeft.data[i].leftLine._collection[0].y = queueLeft.data[i].y;
                    queueLeft.data[i].leftLine._collection[1].x = queueLeft.data[i].leftTree.x;
                    queueLeft.data[i].leftLine._collection[1].y = queueLeft.data[i].leftTree.y;
                }
                if(queueLeft.data[i].rightLine != null){
                    queueLeft.data[i].rightLine._collection[0].x = queueLeft.data[i].x;
                    queueLeft.data[i].rightLine._collection[0].y = queueLeft.data[i].y;
                    queueLeft.data[i].rightLine._collection[1].x = queueLeft.data[i].rightTree.x;
                    queueLeft.data[i].rightLine._collection[1].y = queueLeft.data[i].rightTree.y;
                }
            }

            // 特别部分的处理 p 的 leftLine
            if(p.leftLine != null){
                for(let i=0;i<cRightQueue.length;i++){
                    cRightQueue.data[i].x += args.x;
                    // 不需要提升
                    cRightQueue.data[i].circle.translation.set(cRightQueue.data[i].x,cRightQueue.data[i].y);
                    cRightQueue.data[i].text.translation.set(cRightQueue.data[i].x,cRightQueue.data[i].y);
                    if(cRightQueue.data[i].leftLine != null){
                        cRightQueue.data[i].leftLine._collection[0].x = cRightQueue.data[i].x;
                        cRightQueue.data[i].leftLine._collection[0].y = cRightQueue.data[i].y;
                        cRightQueue.data[i].leftLine._collection[1].x = cRightQueue.data[i].leftTree.x;
                        cRightQueue.data[i].leftLine._collection[1].y = cRightQueue.data[i].leftTree.y;
                    }
                    if(cRightQueue.data[i].rightLine != null){
                        cRightQueue.data[i].rightLine._collection[0].x = cRightQueue.data[i].x;
                        cRightQueue.data[i].rightLine._collection[0].y = cRightQueue.data[i].y;
                        cRightQueue.data[i].rightLine._collection[1].x = cRightQueue.data[i].rightTree.x;
                        cRightQueue.data[i].rightLine._collection[1].y = cRightQueue.data[i].rightTree.y;
                    }
                }
                p.leftLine._collection[0].x += args.x;
                p.leftLine._collection[0].x +=(NodeLineDistance/50);
                p.leftLine._collection[1].x += args.x;
            }

            //完成之后刷新
            two.update();
            if(Math.abs(pStartPositionY-p.y)>=50){
                p.circle.translation.set(p.x,p.y);
                p.text.translation.set(p.x,p.y);
                two.update();
                resolve();
                window.clearInterval(timer);
            };
        },10);
    });

    promise.then(()=>{
        console.log("一次调整结束");
        AVLTreeFixup(c,"");
    });

}

// AVL tree right-right rotation
function AVLRRR(p) {
    let c = p.rightTree;
    let pIsRoot = p.parent === null ? true : false;
    console.log("p is root?",pIsRoot);
    // p的左边子树的所有结点，需要下降
    let queueLeft = new Queue();
    if(p.leftTree!=null){
        preorder(p.leftTree,queueLeft);
    }
    // c的左边子树的所有结点，需要上升
    let queueRight = new Queue();
    if(c.rightTree!=null){
        console.log("可以进行到这一步");
        preorder(c.rightTree,queueRight);
    }
    // 起始位置
    let pStartPositionX = p.x;
    let pStartPositionY = p.y;
    let cStartPositionX = c.x;
    let cStartPositionY = c.y;
    
    // 交换线权
    let tempLine = c.leftLine;
    c.leftLine = p.rightLine;
    p.rightLine = tempLine;

    // 交换地位
    let tempTree = c.leftTree; 
    c.parent = p.parent;
    p.parent = c;
    c.leftTree = p;
    p.rightTree = tempTree;
    if(p.rightTree != null){
        p.rightTree.parent = p;
    }

    // 交换 c 的 leftLine 的头尾
    // 这样 c 的 leftLine 一定存在，因此需要线交换头尾
    // 这里应该可以用 解构赋值 来简化
    let tempValue = c.leftLine._collection[0].x;
    c.leftLine._collection[0].x = c.leftLine._collection[1].x;
    c.leftLine._collection[1].x = tempValue;
    tempValue = c.leftLine._collection[0].y;
    c.leftLine._collection[0].y = c.leftLine._collection[1].y;
    c.leftLine._collection[1].y = tempValue;

   
    let NodeLineDistance;
    // 放 C 原来左边的子树的内容
    let cRightQueue = new Queue();
    if(p.rightLine != null){
        console.log("p.rightTree",p.rightTree.data);
        NodeLineDistance = pStartPositionX - p.rightLine._collection[0].x;
        preorder(p.rightTree,cRightQueue);
        p.removeCircle();
        p.drawTreeNode();
    }

    if(pIsRoot){
        root = c;
    }else{
        if(c.parent.data > c.data){
            c.parent.leftTree = c;
        }else{
            c.parent.rightTree = c;
        }
    }

    // console.log("queueLeft",queueLeft);

    promise = new Promise((resolve,reject)=>{
        console.log("进入promise");
        let timer = setInterval(()=>{
            let args;
            if(pIsRoot){
                args = {
                    x:(pStartPositionX-cStartPositionX)/50,
                    y:(pStartPositionY-cStartPositionY)/50,
                }
            }else{
                args = {
                    x:0,
                    y:-50/50,
                }
                if(c.data<c.parent.data){
                    // 说明是父节点的左子树
                    c.parent.leftLine._collection[1].x -= (pStartPositionX-cStartPositionX)/50;
                }else{
                    c.parent.rightLine._collection[1].x -= (pStartPositionX-cStartPositionX)/50;
                }
            }
            //降低高度，对应 y 增加
            // p 和 p left
            console.log("刷新一次");
            p.x += args.x;
            p.y -= args.y;
            p.circle.translation.set(p.x,p.y);
            p.text.translation.set(p.x,p.y);
            if(p.leftLine != null){
                p.leftLine._collection[0].x += args.x;
                p.leftLine._collection[0].y -= args.y;
                p.leftLine._collection[1].x += args.x;
                p.leftLine._collection[1].y -= args.y;
            }
            // p 的左边的所有
            for(let i =0;i<queueLeft.data.length;i++){
                queueLeft.data[i].x += args.x;
                queueLeft.data[i].y -= args.y;
                queueLeft.data[i].circle.translation.set(queueLeft.data[i].x,queueLeft.data[i].y);
                queueLeft.data[i].text.translation.set(queueLeft.data[i].x,queueLeft.data[i].y);
                if(queueLeft.data[i].leftLine != null){
                    queueLeft.data[i].leftLine._collection[0].x = queueLeft.data[i].x;
                    queueLeft.data[i].leftLine._collection[0].y = queueLeft.data[i].y;
                    queueLeft.data[i].leftLine._collection[1].x = queueLeft.data[i].leftTree.x;
                    queueLeft.data[i].leftLine._collection[1].y = queueLeft.data[i].leftTree.y;
                }
                if(queueLeft.data[i].rightLine != null){
                    queueLeft.data[i].rightLine._collection[0].x = queueLeft.data[i].x;
                    queueLeft.data[i].rightLine._collection[0].y = queueLeft.data[i].y;
                    queueLeft.data[i].rightLine._collection[1].x = queueLeft.data[i].rightTree.x;
                    queueLeft.data[i].rightLine._collection[1].y = queueLeft.data[i].rightTree.y;
                }
            }
            // 升高高度, c的左子树一定存在，因此c的 leftLine 一定存在，
            // 对应 y减少
            c.x += args.x;
            c.y += args.y;
            c.circle.translation.set(c.x,c.y);
            c.text.translation.set(c.x,c.y)
            c.leftLine._collection[0].x = c.x;
            c.leftLine._collection[0].y = c.y;
            c.leftLine._collection[1].x = c.leftTree.x;
            c.leftLine._collection[1].y = c.leftTree.y;
            c.rightLine._collection[0].x = c.x;
            c.rightLine._collection[0].y = c.y;
            c.rightLine._collection[1].x = c.rightTree.x;
            c.rightLine._collection[1].y = c.rightTree.y;

            // 上升
            for(let i =0;i<queueRight.data.length;i++){
                queueRight.data[i].x += args.x;
                queueRight.data[i].y += args.y;
                queueRight.data[i].circle.translation.set(queueRight.data[i].x,queueRight.data[i].y);
                queueRight.data[i].text.translation.set(queueRight.data[i].x,queueRight.data[i].y);
                if(queueRight.data[i].leftLine != null){
                    queueRight.data[i].leftLine._collection[0].x = queueRight.data[i].x;
                    queueRight.data[i].leftLine._collection[0].y = queueRight.data[i].y;
                    queueRight.data[i].leftLine._collection[1].x = queueRight.data[i].leftTree.x;
                    queueRight.data[i].leftLine._collection[1].y = queueRight.data[i].leftTree.y;
                }
                if(queueRight.data[i].rightLine != null){
                    queueRight.data[i].rightLine._collection[0].x = queueRight.data[i].x;
                    queueRight.data[i].rightLine._collection[0].y = queueRight.data[i].y;
                    queueRight.data[i].rightLine._collection[1].x = queueRight.data[i].rightTree.x;
                    queueRight.data[i].rightLine._collection[1].y = queueRight.data[i].rightTree.y;
                }
            }

            // 特别部分的处理 p 的 leftLine
            if(p.rightLine != null){
                for(let i=0;i<cRightQueue.length;i++){
                    cRightQueue.data[i].x += args.x;
                    // 不需要提升
                    cRightQueue.data[i].circle.translation.set(cRightQueue.data[i].x,cRightQueue.data[i].y);
                    cRightQueue.data[i].text.translation.set(cRightQueue.data[i].x,cRightQueue.data[i].y);
                    if(cRightQueue.data[i].leftLine != null){
                        cRightQueue.data[i].leftLine._collection[0].x = cRightQueue.data[i].x;
                        cRightQueue.data[i].leftLine._collection[0].y = cRightQueue.data[i].y;
                        cRightQueue.data[i].leftLine._collection[1].x = cRightQueue.data[i].leftTree.x;
                        cRightQueue.data[i].leftLine._collection[1].y = cRightQueue.data[i].leftTree.y;
                    }
                    if(cRightQueue.data[i].rightLine != null){
                        cRightQueue.data[i].rightLine._collection[0].x = cRightQueue.data[i].x;
                        cRightQueue.data[i].rightLine._collection[0].y = cRightQueue.data[i].y;
                        cRightQueue.data[i].rightLine._collection[1].x = cRightQueue.data[i].rightTree.x;
                        cRightQueue.data[i].rightLine._collection[1].y = cRightQueue.data[i].rightTree.y;
                    }
                }
                p.rightLine._collection[0].x += args.x;
                p.rightLine._collection[0].x +=(NodeLineDistance/50);
                p.rightLine._collection[1].x += args.x;
            }

            //完成之后刷新
            two.update();
            if(Math.abs(pStartPositionY-p.y)>=50){
                // 我猜可以不要
                p.circle.translation.set(p.x,p.y);
                p.text.translation.set(p.x,p.y);
                two.update();
                resolve();
                window.clearInterval(timer);
            };
        },10);
    });

    promise.then(()=>{
        console.log("一次调整结束");
        AVLTreeFixup(c,"");
    })
}


// AVL tree left right rotation
function AVLLRR(p) {
    let c = p.rightTree;
    let g = c.leftTree;

    let cStartPositionX = c.x;
    let cStartPositionY = c.y;
    let gStartPositionX = g.x;
    let gStartPositionY = g.y;
    let args = {
        x:0,
        y:-50/50
    };

    // g 的左子树
    let gLeft = new Queue();
    if(g.leftTree != null){
        preorder(g.leftTree,gLeft);
    }
    // g 的右子树(可能用不到)
    let gRight = new Queue();
    if(g.rightTree != null){
        preorder(g.rightTree,gLeft);
    }
    // c 的右子树
    let cRight = new Queue();
    if(c.rightTree != null){
        preorder(c.rightTree,cRight);
    }

    // 交换线权
    let tempLine = g.rightLine;
    g.rightLine = c.leftLine;
    c.leftLine = tempLine;

    // 交换地位
    let tempNode = g.rightTree;
    g.parent = p;
    g.rightTree = c;
    p.rightTree = g;
    c.leftTree = tempNode;
    c.parent = g;
    if(c.leftTree != null){
        c.leftTree.parent = c;
    }

    // g 的 rightLine 交换线头尾
    let tempValue = g.rightLine._collection[0].x;
    g.rightLine._collection[0].x = g.rightLine._collection[1].x;
    g.rightLine._collection[1].x = tempValue;
    tempValue = g.rightLine._collection[0].y;
    g.rightLine._collection[0].y = g.rightLine._collection[1].y;
    g.rightLine._collection[1].y = tempValue;
    let cAndcLeftLineDistance;
    if(c.leftLine != null){
        cAndcLeftLineDistance = c.x-c.leftLine._collection[0].x;
    }
    let gAndpRightLineDistance = g.x-p.rightLine._collection[1].x;

    let promise = new Promise((resolve,reject)=>{
        let timer = setInterval(()=>{

            //提升部分
            // g 本身
            g.x += args.x;
            g.y += args.y;
            g.circle.translation.set(g.x,g.y);
            g.text.translation.set(g.x,g.y);
            for(let i =0;i<gLeft.data.length;i++){
                gLeft.data[i].x += args.x;
                gLeft.data[i].y += args.y;
                gLeft.data[i].circle.translation.set(gLeft.data[i].x,gLeft.data[i].y);
                gLeft.data[i].text.translation.set(gLeft.data[i].x,gLeft.data[i].y);
                if(gLeft.data[i].leftLine != null){
                    gLeft.data[i].leftLine._collection[0].x = gLeft.data[i].x;
                    gLeft.data[i].leftLine._collection[0].y = gLeft.data[i].y;
                    gLeft.data[i].leftLine._collection[1].x = gLeft.data[i].leftTree.x;
                    gLeft.data[i].leftLine._collection[1].y = gLeft.data[i].leftTree.y;
                }
                if(gLeft.data[i].rightLine != null){
                    gLeft.data[i].rightLine._collection[0].x = gLeft.data[i].x;
                    gLeft.data[i].rightLine._collection[0].y = gLeft.data[i].y;
                    gLeft.data[i].rightLine._collection[1].x = gLeft.data[i].rightTree.x;
                    gLeft.data[i].rightLine._collection[1].y = gLeft.data[i].rightTree.y;
                }
            }

            // 下降操作
            // c 本身
            c.x -= args.x;
            c.y -= args.y;
            c.circle.translation.set(c.x,c.y);
            c.text.translation.set(c.x,c.y);

            for(let i =0;i<cRight.data.length;i++){
                cRight.data[i].x -= args.x;
                cRight.data[i].y -= args.y;
                cRight.data[i].circle.translation.set(cRight.data[i].x,cRight.data[i].y);
                cRight.data[i].text.translation.set(cRight.data[i].x,cRight.data[i].y);
                if(cRight.data[i].leftLine != null){
                    cRight.data[i].leftLine._collection[0].x = cRight.data[i].x;
                    cRight.data[i].leftLine._collection[0].y = cRight.data[i].y;
                    cRight.data[i].leftLine._collection[1].x = cRight.data[i].leftTree.x;
                    cRight.data[i].leftLine._collection[1].y = cRight.data[i].leftTree.y;
                }
                if(cRight.data[i].rightLine != null){
                    cRight.data[i].rightLine._collection[0].x = cRight.data[i].x;
                    cRight.data[i].rightLine._collection[0].y = cRight.data[i].y;
                    cRight.data[i].rightLine._collection[1].x = cRight.data[i].rightTree.x;
                    cRight.data[i].rightLine._collection[1].y = cRight.data[i].rightTree.y;
                }
            }

            // 特殊处理
            // g 的 leftLine
            if(g.leftLine != null){
                g.leftLine._collection[0].x = g.x;
                g.leftLine._collection[0].y = g.y;
                g.leftLine._collection[1].x = g.leftTree.x;
                g.leftLine._collection[1].y = g.leftTree.y;
            }
            // g 的 rightLine
            g.rightLine._collection[0].x = g.x;
            g.rightLine._collection[0].y = g.y;
            g.rightLine._collection[1].x = g.rightTree.x;
            g.rightLine._collection[1].y = g.rightTree.y;
            if(c.leftLine != null){
                c.leftLine._collection[0].x += cAndcLeftLineDistance/50; 
            }
            p.rightLine._collection[1].x += gAndpRightLineDistance/50;

            //完成之后刷新
            two.update();
            if(Math.abs(cStartPositionY-c.y)>=50){
                two.update();
                resolve();
                window.clearInterval(timer);
            };

        },10);
    });

    promise.then(()=>{
        console.log("完成第一次旋转")
        AVLRRR(p);
    })


}

// AVL tree right left rotation
function AVLRLR(p) {
    let c = p.leftTree;
    let g = c.rightTree;

    let cStartPositionX = c.x;
    let cStartPositionY = c.y;
    let gStartPositionX = g.x;
    let gStartPositionY = g.y;
    let args = {
        x:0,
        y:-50/50
    };

    // g 的左子树
    let gLeft = new Queue();
    if(g.leftTree != null){
        preorder(g.leftTree,gLeft);
    }
    // g 的右子树(可能用不到)
    let gRight = new Queue();
    preorder(g.rightTree,gLeft);

    // c 的左子树
    let cLeft = new Queue();
    preorder(c.leftTree,cRight);

    // 交换线权
    let tempLine = g.leftLine;
    g.leftLine = c.rightLine;
    c.rightLine = tempLine;

    // 交换地位
    let tempNode = g.leftTree;
    g.parent = p;
    g.leftTree = c;
    p.leftTree = g;
    c.rightTree = tempNode;
    c.parent = g;
    if(c.rightTree != null){
        c.rightTree.parent = c;
    }

    // g 的 leftLine 交换线头尾
    let tempValue = g.leftLine._collection[0].x;
    g.leftLine._collection[0].x = g.leftLine._collection[1].x;
    g.leftLine._collection[1].x = tempValue;
    tempValue = g.leftLine._collection[0].y;
    g.leftLine._collection[0].y = g.leftLine._collection[1].y;
    g.leftLine._collection[1].y = tempValue;


    let cAndcRightLineDistance;
    if(c.rightLine != null){
        cAndcRightLineDistance = c.x-c.rightLine._collection[0].x;
    }
    let gAndpLeftLineDistance = g.x-p.leftLine._collection[1].x;


    let promise = new Promise((resolve,reject)=>{
        let timer = setInterval(()=>{

            //提升部分
            // g 本身
            g.x += args.x;
            g.y += args.y;
            g.circle.translation.set(g.x,g.y);
            g.text.translation.set(g.x,g.y);
            for(let i =0;i<gRight.data.length;i++){
                gRight.data[i].x += args.x;
                gRight.data[i].y += args.y;
                gRight.data[i].circle.translation.set(gRight.data[i].x,gRight.data[i].y);
                gRight.data[i].text.translation.set(gRight.data[i].x,gRight.data[i].y);
                if(gRight.data[i].leftLine != null){
                    gRight.data[i].leftLine._collection[0].x = gRight.data[i].x;
                    gRight.data[i].leftLine._collection[0].y = gRight.data[i].y;
                    gRight.data[i].leftLine._collection[1].x = gRight.data[i].leftTree.x;
                    gRight.data[i].leftLine._collection[1].y = gRight.data[i].leftTree.y;
                }
                if(gRight.data[i].rightLine != null){
                    gRight.data[i].rightLine._collection[0].x = gRight.data[i].x;
                    gRight.data[i].rightLine._collection[0].y = gRight.data[i].y;
                    gRight.data[i].rightLine._collection[1].x = gRight.data[i].rightTree.x;
                    gRight.data[i].rightLine._collection[1].y = gRight.data[i].rightTree.y;
                }
            }

            // 下降操作
            // c 本身
            c.x -= args.x;
            c.y -= args.y;
            c.circle.translation.set(c.x,c.y);
            c.text.translation.set(c.x,c.y);

            for(let i =0;i<cLeft.data.length;i++){
                cLeft.data[i].x -= args.x;
                cLeft.data[i].y -= args.y;
                cLeft.data[i].circle.translation.set(cLeft.data[i].x,cLeft.data[i].y);
                cLeft.data[i].text.translation.set(cLeft.data[i].x,cLeft.data[i].y);
                if(cLeft.data[i].leftLine != null){
                    cLeft.data[i].leftLine._collection[0].x = cLeft.data[i].x;
                    cLeft.data[i].leftLine._collection[0].y = cLeft.data[i].y;
                    cLeft.data[i].leftLine._collection[1].x = cLeft.data[i].leftTree.x;
                    cLeft.data[i].leftLine._collection[1].y = cLeft.data[i].leftTree.y;
                }
                if(cLeft.data[i].rightLine != null){
                    cLeft.data[i].rightLine._collection[0].x = cLeft.data[i].x;
                    cLeft.data[i].rightLine._collection[0].y = cLeft.data[i].y;
                    cLeft.data[i].rightLine._collection[1].x = cLeft.data[i].rightTree.x;
                    cLeft.data[i].rightLine._collection[1].y = cLeft.data[i].rightTree.y;
                }
            }

            // 特殊处理
            // g 的 leftLine
            if(g.rightLine != null){
                g.rightLine._collection[0].x = g.x;
                g.rightLine._collection[0].y = g.y;
                g.rightLine._collection[1].x = g.rightTree.x;
                g.rightLine._collection[1].y = g.rightTree.y;
            }
            // g 的 rightLine
            g.leftLine._collection[0].x = g.x;
            g.leftLine._collection[0].y = g.y;
            g.leftLine._collection[1].x = g.leftTree.x;
            g.leftLine._collection[1].y = g.leftTree.y;
            if(c.rightLine != null){
                c.rightLine._collection[0].x += cAndcRightLineDistance/50; 
            }
            p.leftLine._collection[1].x += gAndpLineLineDistance/50;

            //完成之后刷新
            two.update();
            if(Math.abs(cStartPositionY-c.y)>=50){
                two.update();
                resolve();
                window.clearInterval(timer);
            };

        },10);
    });

    promise.then(()=>{
        console.log("完成第一次旋转")
        AVLLLR(p);
    })
}