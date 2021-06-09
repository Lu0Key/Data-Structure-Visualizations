/**
 * 去掉字符串中的所有空白符
 * @param {String} str 
 * @returns 去掉空白符的字符串
 */
function removeStringBlank(str) {
    return  str.replaceAll(" ","");

}

/**
 * 判断是否是合法的一维数组(没有嵌套数组)
 * 合法返回   true
 * 不合法返回 false
 * @param {String} str 
 * @returns true| false
 */
function isOneDimensionalArray (str) {
    let length = str.length;
    if(str.length < 2){return false;}
    if(str[0] != '[' || str[length-1] != ']'){return false;}
    let stack = new Stack();
    let substring = str.substring(1,length-1);
    let array = substring.split(",");
    for(let i =0;i<array.length;i++){
        if(isNaN(array[i])){
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {Array} oldArray 
 * @returns 转换后的数组
 */
function charArray2NumberArray(oldArray) {
    let newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
        newArray[i] = oldArray[i]-0;
    }
    return newArray;
}

/**
 * 判断是不是合法的插入数组
 * @param {String} str 
 * @returns
 */
function isAddSequence(str) {
    str = removeStringBlank(str);
    array = str.split(",");
    for (let i = 0; i < array.length; i++) {
        if(isNaN(array[i])){
            return false;
        }
    }
    return true;
}


// ------ start ---------------
// ------ 遍历   --------------
/**
 * 遍历的方式
 * @param {String} str 
 * @returns 
 */
function order(str) {
    if(root == null) {
        console.log("树为空");
        return;
    }
    console.log(str+"开始...");
    let queue = new Queue();
    if(str === "前序遍历"){preorder(root,queue);}
    if(str === "中序遍历"){inorder(root,queue);}
    if(str === "后序遍历"){postorder(root,queue);}
    let array = [];
    let timer = setInterval(()=>{
        let node = queue.pop();
        array.push(node.data);
        node.flash();
        if(queue.length == 0){
            console.log(str,":",array.toString());
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


/**
 * 提示信息
 * @param {String} message 
 */
function promptMessage(message) {
    alert(message);
}


/**
 * 一般性二叉树的搜索
 * @param {Number} data 
 * @returns 
 */
function findBinaryTreeNode(data) {
    if(root == null){
        console.log("树为空");
        isAnimation = false;
        return;
    }

    let queue = new Queue();
    let flag = false;
    inorder(root,queue);
    let node = null;
    let promise = new Promise((resolve)=>{
        let timer = setInterval(()=>{
            node = queue.pop();
            node.flash();
            if(node.data === data){
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
            let count = 0;
            timer = setInterval(()=>{
                node.flash();
                count++;
                if(count>=3) {
                    isAnimation = false;
                    window.clearInterval(timer);
                    promptMessage("已找到");
                }
            },800);
        }else{
            isAnimation = false;
            promptMessage("不存在");
        }
    });
}


/**
 * 二叉搜索树类的搜索
 * BST，AVL树，RBTree都可以用
 * @param {Number} data 
 * @returns 
 */
function findBSTreeNode(data) {
    if(root == null){
        console.log("树为空");
        isAnimation = false;
        return;
    }
    let flag = false;
    let existence = false;
    let node = root;
    let queue = new Queue();
    while(!flag&&(!existence)){
        queue.push(node);
        if(node.data === data){
            existence = true;
        }
        if(node.data > data){
            if(node.leftTree === null){
                flag = true;
            }else{
                node = node.leftTree;
            }
        }
        if(node.data < data){
            if(node.rightTree === null){
                flag = true
            }else{
                node = node.rightTree;
            }
        }
    }

    let promise = new Promise((resolve)=>{
        let timer = setInterval(()=>{
            node = queue.pop();
            node.flash();
            if(node.data === data){
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
            let count = 0;
            timer = setInterval(()=>{
                node.flash();
                count++;
                if(count>=3) {
                    isAnimation = false;
                    window.clearInterval(timer);
                    promptMessage("已找到");
                }
            },800);
        }else{
            isAnimation = false;
            promptMessage("不存在");
        }
    });
}


/**
 * 判断字符串是否能转换成数组
 * @param {String} str 
 * @returns true|false
 */
function judgeStr2Array(str) {
    let stack = new Stack();
    let length = str.length;
    if(length<1){
        promptMessage("字符串过短");
        return false;
    }
    if(str[0]!='[' || str[length-1]!=']' ){
        promptMessage("请检查字符串首尾是否合法");
        return false;
    }


    for(let i = 1;i<length-1;i++){
        if(
            str[i]!='['&&
            str[i]!=']'&&
            !(str[i]-'0'>=0&&str[i]-'0'<=9)&&
            str[i]!=','){
            promptMessage("不能输入 '[',']',','以及数字 之外的字符");
            return false;
        }
        
        if(str[i]=='['){
            stack.push(str[i]);
        }

        if(str[i]==']'){
            let a = stack.pop();
            if(!isNaN(a)){a = stack.pop();}
            if(a=='['){
                if(i<length-1&&str[i+1]==','){
                    i++;
                    continue;
                }
            }else{
                promptMessage("请检查字符串");
                return false;
            }
        }
        
        if(str[i]==','){
            let a = stack.pop();
            if(isNaN(a)){
                promptMessage("请检查字符串");
                return false;
            }
            if(i<length-1&&(str[i+1]=='['||(str[i+1]-'0'>=0||str[i+1]-'0'<=9))){
                ;
            }else{
                promptMessage("请检查字符串");
                return false;
            }
        }

        if(str[i]-'0'>=0&&str[i]-'0'<=9){
            let a = str[i]-'0';
            i++;
            while(str[i]-'0'>=0&&str[i]-'0'<=9&&i<length){
                //  这里容易让人误会，换一种写法
                // a = a+str[i]-'0';
                a = a*10+(str[i]-'0');
                i++;
            }
            //遇到不对的了，要退回去一位
            i--;
            stack.push(a);
        }
    }

    return true;
}

/**
 * 判断数组是否满足二叉树数组的格式
 * 即，数组只有两种可能
 * 1. 为空数组
 * 2. 非空数组，且有三个元素，第一个元素为数字，第二三个元素为满足二叉树数组格式的数组
 * @param {Array} array 
 * @returns true|false
 */
function judgeArray(array) {
    if(array.length == 0) {
        return true;
    }
    if(array.length == 3){
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
