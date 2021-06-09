function drawAVLTree(array){
    insertAVLTreeNodeArray(array);
    drawTreeImage();
}

function insertAVLTreeNodeArray(array) {
    for (let i = 0; i < array.length; i++) {
        insertAVLTreeNodeNoAnimation(root,array[i]);
    }
}

function insertAVLTreeNodeNoAnimation(node,data) {
    if(root === null){
        root = new Tree(data);
        root.x = params.width/2;
        root.y = 100;
        return root;
    }
    // 比自身更小的都放左边
    if(data < node.data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
            fixupAVLTreePositionNoAnimation(node.leftTree);
            fixupAVLTreeNoAnimation(node.leftTree);
        }else{
            insertAVLTreeNodeNoAnimation(node.leftTree,data);
        }
    }else{
    // 大于等于自身的才放右边
    // 右边
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
            fixupAVLTreePositionNoAnimation(node.rightTree);
            fixupAVLTreeNoAnimation(node.rightTree);
        }else{
            insertAVLTreeNodeNoAnimation(node.rightTree,data);
        }
    }
}

function fixupAVLTreePositionNoAnimation(node) {
    fixupBSTreePositionNoAnimation(node);
}

function fixupAVLTreeNoAnimation(node) {
    let p = node;
    while(p!=null&&p.isBalance()){
        p = p.parent;
    }

    if(p === null){
        console.log("平衡！");
    }else if(!p.isBalance()){
        if(node.data < p.data){
            // 小于自身一定是自身的左子树
            // 因此p的左子树一定不为空
            if(p.leftTree.data > node.data){
                // 一定是左子树的左子树
                // 右旋
                console.log("左左");
                AVLLLRNoAnimation(p);
            }else{
                // 左子树的右子树
                // 右旋-左旋
                console.log("左右");
                AVLRLRNoAnimation(p);
            }
        }else{
            // 右子树
            if(p.rightTree.data > node.data){
                // 右子树的左子树
                // 左旋-右旋
                console.log("右左");
                AVLLRRNoAnimation(p);
            }else{
                // 右子树的右子树
                // 左旋
                console.log("右右");
                AVLRRRNoAnimation(p);
            }
        }    
    }
}

/**
 * AVL 树
 * 无动画
 * 左左的情况
 *      p
 *     /
 *    c
 * 
 * @param {AVLTreeNode} p 
 */
function AVLLLRNoAnimation(p) {
    let c = p.leftTree;
    let pIsRoot = p.parent === null ? true : false;
    console.log("p is root?",pIsRoot);
    // p的右边子树的所有结点，需要下降
    let queueDown = new Queue();
    inorder(p.rightTree,queueDown);
    // c的左边子树的所有结点，需要上升
    let queueUp = new Queue();
    inorder(c.leftTree,queueUp);

    let queueAll = new Queue();

    // 设置偏移参数
    let args = {
        x:0,
        y:50
    };

    let movex = 0;

    if(pIsRoot){
        movex = root.x-root.leftTree.x;
        inorder(root,queueAll);
    }

    
    // 交换地位
    let tempTree = c.rightTree; 
    c.parent = p.parent;
    p.parent = c;
    c.rightTree = p;
    p.leftTree = tempTree;
    if(p.leftTree != null){
        p.leftTree.parent = p;
    }

    queueDown.push(p);
    queueUp.push(c);


    if(pIsRoot){
        root = c;
    }else{
        if(c.parent.data > c.data){
            c.parent.leftTree = c;
        }else{
            c.parent.rightTree = c;
        }
    }

    // 普通结点上升
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(args.x,args.y);
    }
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(args.x,args.y);
    }
    for(let i=0;i<queueAll.length;i++){
        queueAll.data[i].nodeDown(movex,0);
    }

    fixupAVLTreeNoAnimation(c);
}


/**
 * AVL 树
 * 无动画
 * 左左的情况
 *      p
 *     /
 *    c
 *     \
 *      g
 * @param {AVLTreeNode} p 
 */
function AVLRLRNoAnimation(p) {
    let c = p.leftTree;
    let g = c.rightTree;

    let args = {
        x:0,
        y:-50
    };

    let queueUp = new Queue();
    inorder(g.rightTree,queueUp);
    let queueDown = new Queue();
    inorder(c.leftTree,queueUp);


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
    queueUp.push(g);
    queueDown.push(c);

    
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(args.x,args.y);
    }
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(args.x,args.y);
    }

    AVLLLRNoAnimation(p);
}


/**
 * AVL 树
 * 无动画
 * 右左的情况
 *      p
 *       \
 *        c
 *       /
 *      g
 * @param {AVLTreeNode} p 
 */
function AVLLRRNoAnimation(p) {
    let c = p.rightTree;
    let g = c.leftTree;

    let args = {
        x:0,
        y:-50
    };

    let queueUp = new Queue();
    inorder(g.leftTree,queueUp);
    let queueDown = new Queue();
    inorder(c.rightTree,queueUp);


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
    queueUp.push(g);
    queueDown.push(c);

    
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(args.x,args.y);
    }
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(args.x,args.y);
    }

    AVLLLRNoAnimation(p);
}

/**
 * p
 *  \
 *   c
 *    \
 *     g
 * @param {AVLNode} p 
 */
function AVLRRRNoAnimation(p) {
    let c = p.rightTree;
    let pIsRoot = p.parent === null ? true : false;
    console.log("p is root?",pIsRoot);
    // p的左边子树的所有结点，需要下降
    let queueDown = new Queue();
    inorder(p.leftTree,queueDown);
    // c的右边子树的所有结点，需要上升
    let queueUp = new Queue();
    inorder(c.rightTree,queueUp);

    let queueAll = new Queue();

    // 设置偏移参数
    let args = {
        x:0,
        y:50
    };
    let movex=0;

    if(pIsRoot){
        movex = root.x-root.rightTree.x;
        inorder(root,queueAll);
    }

    
    // 交换地位
    let tempTree = c.leftTree; 
    c.parent = p.parent;
    p.parent = c;
    c.leftTree = p;
    p.rightTree = tempTree;
    if(p.rightTree != null){
        p.rightTree.parent = p;
    }

    queueDown.push(p);
    queueUp.push(c);


    if(pIsRoot){
        root = c;
    }else{
        if(c.parent.data > c.data){
            c.parent.leftTree = c;
        }else{
            c.parent.rightTree = c;
        }
    }
    // 普通结点上升
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(args.x,args.y);
    }
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(args.x,args.y);
    }
    for(let i=0;i<queueAll.length;i++){
        queueAll.data[i].nodeDown(movex,0);
    }
    fixupAVLTreeNoAnimation(c);
}


function insertAVLTreeNode(node,data) {
    if(root === null){
        root = new Tree(data);
        fixupAVLTreePosition(root);
        root.drawTreeNode();
        isAnimation = false;
        return;
    }
    // 小于结点就在左边
    if(data < node.data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
            fixupAVLTreePosition(node.leftTree);
        } else {
            insertAVLTreeNode(node.leftTree,data);
        }
    } else {
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
            fixupAVLTreePosition(node.rightTree);
        } else {
            insertAVLTreeNode(node.rightTree,data);
        }
    }
}


function fixupAVLTreePosition(node) {
    console.log("fixupAVLTreePosition",fixupAVLTreePosition);
    fixupBSTreePosition(node,AVLTreeFixup);
}


function AVLTreeFixup(node) {
    console.log("进入AVL平衡调整");
    // 放查询节点的
    let queue = new Queue();
    let p = node;
    let tempNode = null;
    while(p!=null&&p.isBalance()){
        queue.push(p);
        p = p.parent;
    }
    // 表明一直到 root 都是平衡的
    
    let promise = new Promise((resolve)=>{
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
                    AVLRLR(p);
                    
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
    preorder(g.rightTree,gRight);

    // c 的左子树
    let cLeft = new Queue();
    preorder(c.leftTree,cLeft);

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
            p.leftLine._collection[1].x += gAndpLeftLineDistance/50;

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