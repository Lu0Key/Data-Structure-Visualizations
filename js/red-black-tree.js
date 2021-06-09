/**
 * 红黑树的定义
 * @param {Number} data 
 */
function RBTree(data) {
    this.data = data;
    this.x = 0;
    this.y = 0;
    this.parent    = null;
    this.circle    = null;
    this.leftTree  = null;
    this.rightTree = null;
    this.leftLine  = null;
    this.rightLine = null;
    this.color     = COLORS.RED;
    this.text      = null;

    this.drawTreeNode = ()=>{
        if(this.circle != null){this.circle.remove();}
        if(this.text != null){this.text.remove();}
        this.circle = two.makeCircle(this.x,this.y,RADIUS);
        this.circle.stroke = COLORS.BLACK;
        this.circle.linewidth = 1;
        this.circle.fill = this.color;
        this.text = new Two.Text(this.data+"",this.x,this.y,"normal");
        this.text.fill = COLORS.WHITE;
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

    this.flash = ()=>{
        let timer = setInterval(()=>{
            this.circle.linewidth +=0.1;
            this.circle.stroke = "orange";
            two.update();
            if(this.circle.linewidth>=3){
                two.update();
                let timer2 = setInterval(()=>{
                    this.circle.linewidth -=0.1;
                    if(this.circle.linewidth<=1){
                        this.circle.linewidth = 1;
                        this.circle.stroke = COLORS.BLACK;
                        two.update();
                        clearInterval(timer2);
                        clearInterval(timer);
                        return true;
                    }
                },20/animationSpeed)
            }
        },20/animationSpeed);
        setTimeout(()=>{
            return true;
        },800/animationSpeed);
    }

    this.removeLeftLine = ()=>{
        if(this.leftLine  != null){this.leftLine.remove();}
        two.update();
    }

    this.removeRightLine = ()=>{
        if(this.rightLine != null){this.rightLine.remove();}
        two.update();
    }
    this.removeLine = ()=>{
        this.removeLeftLine();
        this.removeRightLine();
    }

    this.removeCircle = ()=>{
        if(this.circle != null){this.circle.remove();}
        if(this.text   != null){this.text.remove();}
        two.update();
    }

    this.remove = ()=>{
        this.removeLine();
        this.removeCircle();
        two.update();
    }
    // ---------
    // |  向右+x(正)
    // |  向上+y(正)
    this.nodeUp = (x,y)=>{
        this.x += x;
        this.y -= y;
        if(this.circle!=null){
            this.circle.translation.set(this.x,this.y);
            this.text.translation.set(this.x,this.y);
        }
        two.update();
    }
    // ---------
    // |  向右+x(正)
    // |  向下+y(正)
    this.nodeDown = (x,y)=>{
        this.x += x;
        this.y += y;
        if(this.circle!=null){
            this.circle.translation.set(this.x,this.y);
            this.text.translation.set(this.x,this.y);
        }
        two.update();
    }

    this.resetLine = ()=>{
        if(this.leftLine != null){
            this.leftLine._collection[0].x = this.x;
            this.leftLine._collection[0].y = this.y;
            this.leftLine._collection[1].x = this.leftTree.x;
            this.leftLine._collection[1].y = this.leftTree.y;
        }
        if(this.rightLine != null){
            this.rightLine._collection[0].x = this.x;
            this.rightLine._collection[0].y = this.y;
            this.rightLine._collection[1].x = this.rightTree.x;
            this.rightLine._collection[1].y = this.rightTree.y;
        }
        two.update();
    }

    this.resetNode = ()=>{
        if(this.circle != null){
            this.circle.remove();
        }
        if(this.text != null){
            this.text.remove();
        }
        this.circle = two.makeCircle(this.x,this.y,RADIUS);
        this.circle.stroke = COLORS.BLACK;
        this.circle.linewidth = 1;
        this.circle.fill = this.color;
        this.text = new Two.Text(this.data+"",this.x,this.y,"normal");
        this.text.fill = COLORS.WHITE;
        two.add(this.text);
        two.update();
    }
}

/**
 * 初始化树并画出来
 * @param {Array} array 
 */
function drawRBTree(array) {
    insertRBTreeNodeArray(array);
    console.log("初始化树完成")
}

/**
 * 通过数组插入一列点到树中
 * @param {Array} array 
 */
function insertRBTreeNodeArray(array) {
    for (let i = 0; i < array.length; i++) {
        insertRBTreeNodeNoAnimation(root,array[i]);
    }
    two.clear();
    drawRBTreeBranch(root);
    drawRBTreeNode(root);
    two.update();
}

function insertRBTreeNodeNoAnimation(node,data) {
    if(root === null){
        root = new RBTree(data);
        root.color = COLORS.BLACK;
        fixupRBTreePositionNoAnimation(root);
        root.drawTreeNode();
        return;
    }
    // 小于结点就在左边
    if(data < node.data){
        if(node.leftTree === null){
            node.leftTree = new RBTree(data);
            node.leftTree.parent = node;
            fixupRBTreePositionNoAnimation(node.leftTree);
            fixupRBTreeNoAnimation(node.leftTree);
        } else {
            insertRBTreeNodeNoAnimation(node.leftTree,data);
        }
    } else {
        if(node.rightTree === null){
            node.rightTree = new RBTree(data);
            node.rightTree.parent = node;
            fixupRBTreePositionNoAnimation(node.rightTree);
            fixupRBTreeNoAnimation(node.rightTree);
        } else {
            insertRBTreeNodeNoAnimation(node.rightTree,data);
        }
    }
}

function fixupRBTreePositionNoAnimation(node) {
    
    if(node.parent === null){
        node.x = params.width/2;
        node.y = 100;
        return null;
    }
    let args = {
        x:0,
        y:node.parent.y+params.verticalSpacing
    }
    if(node.parent === root){
        if(node.data < root.data){
            args.x = root.x-params.horizontalSpacing;
        } else {
            args.x = root.x+params.horizontalSpacing;
        }
        node.nodeDown(args.x,args.y);
        return null;
    } else {
        // 父节点不是 root
        if(node.data < root.data){
            // 左半边
            if(node.data < node.parent.data){
                // 左的左
                args.x = node.parent.x-params.horizontalSpacing;
            }else{
                // 左的右
                args.x = node.parent.x;
            }
        } else {
            // 右半边
            if(node.data < node.parent.data){
                // 右的左
                args.x = node.parent.x;
            }else{
                // 右的右
                args.x = node.parent.x+params.horizontalSpacing;
                // node.nodeDown(args.x,args.y);
                // return null;
            }
        }
    }
    node.nodeDown(args.x,args.y);
    
    let queue = new Queue();
    let array = [];
    let tempNode = null;
    if(node.data < root.data){
        // 说明在左子树，所有更小的要向左移动
        inorder(root.leftTree,queue);
        while(queue.length != 0){
            tempNode = queue.pop();
            if(tempNode.data <= node.data){
                array.push(tempNode);
            }
        }
        // 这边会将结点自身push进array，而且是最后一个，因此要删掉;
        array.pop();
        // 左移
        for (let i = 0; i < array.length; i++) {
            array[i].nodeUp(-params.horizontalSpacing,0);

        }
    } else {
        // 说明在右子树，所有更大的要向右移动
        inorder(root.rightTree,queue);
        while(queue.length != 0){
            tempNode = queue.pop();
            if(tempNode.data > node.data){
                array.push(tempNode);
            }
        }
        // 右移
        for (let i = 0; i < array.length; i++) {
            array[i].nodeUp(params.horizontalSpacing,0);
        }
    }

}

/**
 * 递归画出所有的树枝
 * @param {RBTreeNode} node 
 * @returns null
 */
function drawRBTreeBranch(node) {
    if(node === null){return;}
    node.drawTreeBranch();
    drawRBTreeBranch(node.leftTree);
    drawRBTreeBranch(node.rightTree);
}

/**
 * 通过递归画出所有的节点
 * @param {RBTreeNode} node 
 * @returns null
 */
function drawRBTreeNode(node){
    if(node === null){return;}
    node.drawTreeNode();
    drawRBTreeNode(node.leftTree);
    drawRBTreeNode(node.rightTree);
}

/**
 * 红黑树
 * 无动画修正
 * @param {RBTreeNode} node 
 * @returns 
 */
function fixupRBTreeNoAnimation(node){
    // 如果父节点是空，那么就是 root 结点
    // 颜色变成黑色的就行
    if(node.parent === null){
        root.color = COLORS.BLACK;
        return;
    }
    // 这时候父节点一定存在
    // 如果是父节点是黑色的，那么也不用变
    if(node.parent.color === COLORS.BLACK){
        return;
    }
    // 下面是父节点为红色的情况
    // gp => grandparent
    let gp = node.parent.parent;
    let p = node.parent;
    if(gp === null){
        // 没有祖父结点，说明是 root 节点的子节点
        p.color = COLORS.BLACK;
        return;
    }
    
    if(node.data < gp.data){
        // node 在祖父节点的左边
        if(gp.rightTree != null && gp.rightTree.color === COLORS.RED){
            RBTreeFourNodeDiscolorationNoAnimation(node);
            return;
        }
        if(node.data < p.data){
            // node 在左左
            RBTreeThreeNodeLLRNoAnimation(node);
        } else {
            // node 在左右
            RBTreeThreeNodeLRRNoAnimation(node);
        }
    } else {
        // node 在祖父节点的右边
        if(gp.leftTree != null &&gp.leftTree.color === COLORS.RED){
            RBTreeFourNodeDiscolorationNoAnimation(node);
            return;
        }
        if(node.data < p.data){
            // node 在右左
            RBTreeThreeNodeRLRNoAnimation(node);
        } else {
            // node 在右右
            RBTreeThreeNodeRRRNoAnimation(node)
        }
    }
}

/**
 * 红黑树
 * 对三节点的左左类型进行旋转
 * 无动画版本
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeLLRNoAnimation(node) {
    let gp = node.parent.parent;
    let p = node.parent;
    let isRoot = false;
    // 变颜色 
    gp.color = COLORS.RED;
    p.color = COLORS.BLACK;

    let movex = 0;
    // 设置偏移参数
    let args = {
        x:0,
        y:params.verticalSpacing
    };
    if(gp === root){
        movex = root.x-root.leftTree.x;
        isRoot = true;
    }
    // 
    let queueUp = new Queue();
    let queueDown = new Queue();
    let queueAll = new Queue();
    
    
    inorder(node,queueUp);
    inorder(gp.rightTree,queueDown);
    
    // 交换地位
    let tempTree = p.rightTree;
    p.parent = gp.parent;
    p.rightTree = gp;
    gp.parent = p;
    gp.leftTree = tempTree;
    if(gp.leftTree != null){
        gp.leftTree.parent = gp;    
    }
    if(isRoot){
        root = p;
    }else{
        if(p.data < p.parent.data){
            p.parent.leftTree = p;
        }else{
            p.parent.rightTree = p;
        }
    }
    if(isRoot){
        inorder(root,queueAll);
    }

    queueUp.push(p);
    queueDown.push(gp);
    

    // 普通结点上升
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(args.x,args.y);
    }
    // 普通结点下降
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(args.x,args.y);
    }
    for(let i=0;i<queueAll.length;i++){
        queueAll.data[i].nodeDown(movex,0);
    }

    // 特殊处理


    // p 作为新插入结点继续修正
    // 因为p是黑色的所以不用继续迭代
    // fixupRBTreeNoAnimation(p);
}

/**
 * 红黑树
 * 对三节点的左右类型进行旋转
 * 无动画版本
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeLRRNoAnimation(node) {
    let gp = node.parent.parent;
    let p = node.parent;

    let queueUp = new Queue();
    let queueDown = new Queue();
    
    inorder(node.rightTree,queueUp);
    inorder(p.leftTree,queueDown);

    // 交换地位
    let tempTree = node.leftTree;
    gp.leftTree = node;
    p.parent = node;
    p.rightTree = node.leftTree;
    node.parent = gp;
    node.leftTree = p;
    if(tempTree!=null){
        tempTree.parent = p;
    }
    

    queueUp.push(node);
    queueDown.push(p);


    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(0,params.verticalSpacing);
    }
    // 普通结点下降
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(0,params.verticalSpacing);
    }

    // 这时候p旋转到了下边，且为红色，所以继续迭代
    fixupRBTreeNoAnimation(p);
}

/**
 * 红黑树
 * 对三节点的右左类型进行旋转
 * 无动画版本
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeRLRNoAnimation(node){
    let gp = node.parent.parent;
    let p = node.parent;

    let queueUp = new Queue();
    let queueDown = new Queue();
    
    inorder(node.leftTree,queueUp);
    inorder(p.rightTree,queueDown);

    // 交换地位
    let tempTree = node.rightTree;
    gp.rightTree = node;
    p.parent = node;
    p.leftTree = node.rightTree;
    node.parent = gp;
    node.rightTree = p;
    if(tempTree!=null){
        tempTree.parent = p;
    }

    queueUp.push(node);
    queueDown.push(p);

    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(0,params.verticalSpacing);
    }

    // 普通结点下降
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(0,params.verticalSpacing);
    }
    // 这时候p旋转到了下边，且为红色，所以继续迭代
    fixupRBTreeNoAnimation(p);
}

/**
 * 红黑树
 * 对三节点的右右类型进行旋转
 * 无动画版本
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeRRRNoAnimation(node) {
    let gp = node.parent.parent;
    let p = node.parent;
    let isRoot = false;
    // 变颜色 
    gp.color = COLORS.RED;
    p.color = COLORS.BLACK;

    let movex = 0;
    // 设置偏移参数
    let args = {
        x:0,
        y:params.verticalSpacing
    };
    if(gp === root){
        isRoot = true;
        movex = root.x-root.rightTree.x;
    }
    // 
    let queueUp = new Queue();
    let queueDown = new Queue();
    let queueAll = new Queue();
    
    inorder(node,queueUp);
    inorder(gp.leftTree,queueDown);

    // 交换地位
    let tempTree = p.leftTree;
    p.parent = gp.parent;
    p.leftTree = gp;
    gp.parent = p;
    gp.rightTree = tempTree;
    if(gp.rightTree != null){
        gp.rightTree.parent = gp;
    }
    if(isRoot){
        root = p;
    }else{
        if(p.data < p.parent.data){
            p.parent.leftTree = p;
        }else{
            p.parent.rightTree = p;
        }
    }
    if(isRoot){
        inorder(root,queueAll);
    }

    
    queueUp.push(p);
    queueDown.push(gp);

    // 普通结点上升
    for(let i =0;i<queueUp.length;i++){
        queueUp.data[i].nodeUp(0,args.y);
    }
    for(let i =0;i<queueDown.length;i++){
        queueDown.data[i].nodeDown(0,args.y);
    }
    for(let i=0;i<queueAll.length;i++){
        queueAll.data[i].nodeDown(movex,0);
    }

    // 特殊处理


    // p 作为新插入结点继续修正
    // 因为p是黑色的所以不用继续迭代
    // fixupRBTreeNoAnimation(p);
}

/**
 * 红黑树
 * 对四节点类型的变颜色
 * 无动画版本
 * @param {RBTreeNode} node 
 */
function RBTreeFourNodeDiscolorationNoAnimation(node) {
    node.color = COLORS.RED;
    let gp = node.parent.parent;
    gp.color = COLORS.RED;
    gp.leftTree.color = COLORS.BLACK;
    gp.rightTree.color = COLORS.BLACK;
    fixupRBTreeNoAnimation(gp);

}

/**
 * 带动画的插入
 * @param {RBTreeNode} node 
 * @param {Value} data 
 * @returns 
 */
function insertRBTreeNode(node,data){
    if(root === null){
        root = new RBTree(data);
        fixupRBTreePosition(root);
        root.drawTreeNode();
        setTimeout(()=>{
            root.color = COLORS.BLACK;
            root.resetNode();
            isAnimation = false;
        },200/animationSpeed);
        return;
    }
    // 小于结点就在左边
    if(data < node.data){
        if(node.leftTree === null){
            node.leftTree = new RBTree(data);
            node.leftTree.parent = node;
            fixupRBTreePosition(node.leftTree);
        } else {
            insertRBTreeNode(node.leftTree,data);
        }
    } else {
        if(node.rightTree === null){
            node.rightTree = new RBTree(data);
            node.rightTree.parent = node;
            fixupRBTreePosition(node.rightTree);
        } else {
            insertRBTreeNode(node.rightTree,data);
        }
    }
}



/**
 * 带动画的位置调整
 * @param {RBTreeNode} node 
 */
function fixupRBTreePosition(node) {
    
    if(node.parent === null){
        node.x = params.width/2;
        node.y = 100;
        return null;
    }
    let args = {
        x:0,
        y:node.parent.y+params.verticalSpacing
    }
    if(node.parent === root){
        if(node.data < root.data){
            args.x = root.x - params.horizontalSpacing;
        } else {
            args.x = root.x + params.horizontalSpacing;
        }
        node.nodeDown(args.x,args.y);
        node.parent.drawTreeBranch();
        node.parent.resetNode();
        if(node.parent.leftTree != null){
            node.parent.leftTree.resetNode();
        }
        if(node.parent.rightTree != null){
            node.parent.rightTree.resetNode();
        }
        fixupRBTree(node);
        return null;
    } else {
        // 父节点不是 root
        if(node.data < root.data){
            // 左半边
            if(node.data < node.parent.data){
                // 左的左
                args.x = node.parent.x - params.horizontalSpacing;
            }else{
                // 左的右
                args.x = node.parent.x;
            }
        } else {
            // 右半边
            if(node.data < node.parent.data){
                // 右的左
                args.x = node.parent.x;
            }else{
                // 右的右
                args.x = node.parent.x + params.verticalSpacing;
            }
        }
    }
    let moveArgs = {
        x:0,y:0
    };
    node.nodeDown(args.x,args.y);
    node.parent.drawTreeBranch();
    node.parent.resetNode();
    if(node.parent.leftTree != null){
        node.parent.leftTree.resetNode();
    }
    if(node.parent.rightTree != null){
        node.parent.rightTree.resetNode();
    }
    
    let queue = new Queue();
    let array = [];
    let arrayParents = [];
    let tempNode = null;
    let flag = true;
    let ppnode = null;
    if(node.data < root.data){
        // 说明在左子树，所有更小的要向左移动
        inorder(root.leftTree,queue);
        while(queue.length != 0){
            tempNode = queue.pop();
            if(tempNode.data <= node.data){
                array.push(tempNode);
            }
        }
        for (let i = 0; i < array.length; i++) {
            if(array[i].parent.data>node.data){
                arrayParents.push(array[i].parent);
            }
        }

        moveArgs.x = -params.horizontalSpacing;
        // 这边会将结点自身push进array，而且是最后一个，因此要删掉;
        array.pop();
        
    } else {
        // 说明在右子树，所有更大的要向右移动
        inorder(root.rightTree,queue);
        while(queue.length != 0){
            tempNode = queue.pop();
            if(tempNode.data > node.data){
                array.push(tempNode);
                if(flag){
                    flag = false;
                    ppnode = tempNode.parent;
                }
            }
            
        }
        for (let i = 0; i < array.length; i++) {
            if(array[i].parent.data<=node.data){
                arrayParents.push(array[i].parent);
            }
        }
        moveArgs.x = params.horizontalSpacing;
    }
    let promise = new Promise((resolve)=>{
        let count = 0;
        let timer = setInterval(()=>{
            count++;
            for (let i = 0; i < array.length; i++) {
                array[i].nodeUp(moveArgs.x/50,0);
            }
            for (let i = 0; i < array.length; i++) {
                array[i].resetLine();
            }
            for(let i=0;i < arrayParents.length; i++){
                arrayParents[i].resetLine();
            }

            if(count >=50){
                resolve();
                window.clearInterval(timer);
            }
        },10/animationSpeed);
    });

    promise.then(()=>{
        // 进入修正
        console.log("开始修正");
        fixupRBTree(node);
    })


}


/**
 * 带动画的修正
 * @param {RBTreeNode} node 
 */
function fixupRBTree(node) {
     // 如果父节点是空，那么就是 root 结点
    // 颜色变成黑色的就行
    if(node.parent === null){
        if(node.color == COLORS.RED){
            root.color = COLORS.BLACK;
        }
        setTimeout(()=>{
            root.resetNode();
            isAnimation = false;
        },400/animationSpeed);
        return;
    }
    // 这时候父节点一定存在
    // 如果是父节点是黑色的，那么也不用变
    if(node.parent.color === COLORS.BLACK){
        isAnimation = false;
        return;
    }
    // 下面是父节点为红色的情况
    // gp => grandparent
    let gp = node.parent.parent;
    let p = node.parent;
    if(gp === null){
        // 没有祖父结点，说明是 root 节点的子节点
        // 这种情况应该不会有
        p.color = COLORS.BLACK;
        isAnimation = false;
        p.resetNode();
        return;
    }
    
    if(node.data < gp.data){
        // node 在祖父节点的左边
        if(gp.rightTree != null && gp.rightTree.color === COLORS.RED){
            RBTreeFourNodeDiscoloration(node);
            return;
        }
        if(node.data < p.data){
            // node 在左左
            RBTreeThreeNodeLLR(node);
        } else {
            // node 在左右
            RBTreeThreeNodeLRR(node);
        }
    } else {
        // node 在祖父节点的右边
        if(gp.leftTree != null &&gp.leftTree.color === COLORS.RED){
            RBTreeFourNodeDiscoloration(node);
            return;
        }
        if(node.data < p.data){
            // node 在右左
            RBTreeThreeNodeRLR(node);
        } else {
            // node 在右右
            RBTreeThreeNodeRRR(node)
        }
    }
}


/**
 * 红黑树
 * 带动画
 * 三节点，左左的情况
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeLLR(node) {
    let gp = node.parent.parent;
    let p = node.parent;
    let isRoot = false;
    // 变颜色 
    gp.color = COLORS.RED;
    p.color = COLORS.BLACK;
    // 设置偏移参数
    let args = {
        x : 0,
        y : params.verticalSpacing,
        distancePAndGp:gp.x-p.x
    };
    if(gp === root){
        args.x = root.x-p.x;
        isRoot = true;
    }
    // 
    let queueUp = new Queue();
    let queueDown = new Queue();
    let queueAll = new Queue();
    
    
    inorder(node,queueUp);
    inorder(gp.rightTree,queueDown);
    
    // 交换地位
    let tempTree = p.rightTree;
    p.parent = gp.parent;
    p.rightTree = gp;
    gp.parent = p;
    gp.leftTree = tempTree;
    if(gp.leftTree != null){
        gp.leftTree.parent = gp;
    }
    if(isRoot){
        root = p;
    }else{
        if(p.data < p.parent.data){
            p.parent.leftTree = p;
        }else{
            p.parent.rightTree = p;
        }
    }
    if(isRoot){
        inorder(root,queueAll);
    }

    // 交换线权
    let tempLine = p.rightLine;
    p.rightLine = gp.leftLine;
    gp.leftLine = tempLine;
    
    queueUp.push(p);
    queueDown.push(gp);
    
    let promise = new Promise((resolve)=>{
        node.resetNode()
        p.resetNode();
        gp.resetNode();
        let count = 0;
        let timer = setInterval(()=>{
            count++;
            // 普通结点上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].nodeUp(0,args.y/50);
            }
            // 普通线段上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].resetLine();
            }
            // 普通结点下降
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].nodeDown(0,args.y/50);
            }
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].resetLine();
            }
            for(let i=0;i<queueAll.length;i++){
                queueAll.data[i].nodeDown(args.x/50,0);
            }
            for(let i=0;i<queueAll.length;i++){
                queueAll.data[i].resetLine();
            }
            // 特殊
            if(p.parent != null){
                if(p.data < p.parent.data){
                    p.parent.leftLine._collection[1].x -= args.distancePAndGp/50;
                    p.parent.leftLine._collection[1].x += args.x/50;;
                }else{
                    p.parent.rightLine._collection[1].x -= args.distancePAndGp/50;
                    p.parent.rightLine._collection[1].x += args.x/50;;
                }
            }

            two.update();
            if(count>=50){
                resolve();
                window.clearInterval(timer);
            }
        },10/animationSpeed);
    })
    
    // p 作为新插入结点继续修正
    // 因为p是黑色的所以不用继续迭代
    // fixupRBTreeNoAnimation(p);
    promise.then(()=>{isAnimation = false;})
}

/**
 * 红黑树
 * 带动画
 * 三节点，左右的情况
 * @param {RBTreeNode} node 
 */
function RBTreeThreeNodeLRR(node) {
    console.log("进入左右情况");
    let gp = node.parent.parent;
    let p = node.parent;

    let queueUp = new Queue();
    let queueDown = new Queue();
    
    inorder(node.rightTree,queueUp);
    inorder(p.leftTree,queueDown);

    // 交换地位
    let tempTree = node.leftTree;
    node.parent = gp;
    node.leftTree = p;
    gp.leftTree = node;
    p.parent = node;
    p.rightTree = tempTree;
    if(tempTree!=null){
        tempTree.parent = p;
    }

    // 交换线权
    let tempLine = node.leftLine;
    node.leftLine = p.rightLine;
    p.rightLine = tempLine;


    

    queueUp.push(node);
    queueDown.push(p);

    let promise = new Promise((resolve)=>{
        let count=0;
        let timer = setInterval(()=>{
            count++;

            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].nodeUp(0,params.verticalSpacing/50);
            }
            // 普通线段上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].resetLine();
            }
            // 普通结点下降
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].nodeDown(0,params.verticalSpacing/50);
            }
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].resetLine();
            }
            // 特殊处理
            gp.leftLine._collection[1].x += params.horizontalSpacing/50;

            if(count>=50){
                resolve();
                window.clearInterval(timer);
            }
        },10/animationSpeed);
    })


    // 这时候p旋转到了下边，且为红色，所以继续迭代
    promise.then(()=>{fixupRBTree(p);});
    
}


function RBTreeThreeNodeRLR(node) {
    console.log("进入右左情况");
    let gp = node.parent.parent;
    let p = node.parent;

    let queueUp = new Queue();
    let queueDown = new Queue();
    
    inorder(node.leftTree,queueUp);
    inorder(p.rightTree,queueDown);

    // 交换地位
    let tempTree = node.rightTree;
    node.parent = gp;
    node.rightTree = p;
    gp.rightTree = node;
    p.parent = node;
    p.leftTree = tempTree;
    if(p.leftTree!=null){
        p.leftTree.parent = p;
    }

    // 交换线权
    let tempLine = node.rightLine;
    node.rightLine = p.leftLine;
    p.leftLine = tempLine;


    

    queueUp.push(node);
    queueDown.push(p);

    let promise = new Promise((resolve)=>{
        let count=0;
        let timer = setInterval(()=>{
            count++;

            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].nodeUp(0,params.verticalSpacing/50);
            }
            // 普通线段上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].resetLine();
            }
            // 普通结点下降
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].nodeDown(0,params.verticalSpacing/50);
            }
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].resetLine();
            }
            // 特殊处理
            gp.rightLine._collection[1].x -= params.horizontalSpacing/50;

            if(count>=50){
                resolve();
                window.clearInterval(timer);
            }
        },10/animationSpeed);
    })


    // 这时候p旋转到了下边，且为红色，所以继续迭代
    promise.then(()=>{fixupRBTree(p);});
}


function RBTreeThreeNodeRRR(node) {
    let gp = node.parent.parent;
    let p = node.parent;
    let isRoot = false;
    // 变颜色 
    gp.color = COLORS.RED;
    p.color = COLORS.BLACK;
    // 设置偏移参数
    let args = {
        x : 0,
        y : params.verticalSpacing,
        distancePAndGp:gp.x-p.x
    };
    if(gp === root){
        args.x = root.x-p.x;
        isRoot = true;
    }
    // 
    let queueUp = new Queue();
    let queueDown = new Queue();
    let queueAll = new Queue();
    
    
    inorder(node,queueUp);
    inorder(gp.leftTree,queueDown);
    
    // 交换地位
    let tempTree = p.leftTree;
    p.parent = gp.parent;
    p.leftTree = gp;
    gp.parent = p;
    gp.rightTree = tempTree;
    if(gp.rightTree != null){
        gp.rightTree.parent = gp;
    }
    if(isRoot){
        root = p;
    }else{
        if(p.data < p.parent.data){
            p.parent.leftTree = p;
        }else{
            p.parent.rightTree = p;
        }
    }
    if(isRoot){
        inorder(root,queueAll);
    }

    // 交换线权
    let tempLine = p.leftLine;
    p.leftLine = gp.rightLine;
    gp.rightLine = tempLine;

    // 线掉头 q
    // 这个线肯定存在
    // 线可能没创建
    // 很有可能不要交换线头，因为resetLine会每次重置，多半看不出来
    // let tempValue = p.rightLine._collection[0].x;
    // p.rightLine._collection[0].x = p.rightLine._collection[1].x;
    // p.rightLine._collection[1].x = tempValue;
    // tempValue = p.rightLine._collection[0].y;
    // p.rightLine._collection[0].y = p.rightLine._collection[1].y;
    // p.rightLine._collection[1].y = tempValue;
    
    queueUp.push(p);
    queueDown.push(gp);
    
    let promise = new Promise((resolve)=>{
        node.resetNode()
        p.resetNode();
        gp.resetNode();
        let count = 0;
        let timer = setInterval(()=>{
            count++;
            // 普通结点上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].nodeUp(0,args.y/50);
            }
            // 普通线段上升
            for(let i =0;i<queueUp.length;i++){
                queueUp.data[i].resetLine();
            }
            // 普通结点下降
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].nodeDown(0,args.y/50);
            }
            for(let i =0;i<queueDown.length;i++){
                queueDown.data[i].resetLine();
            }
            for(let i=0;i<queueAll.length;i++){
                queueAll.data[i].nodeDown(args.x/50,0);
            }
            for(let i=0;i<queueAll.length;i++){
                queueAll.data[i].resetLine();
            }
            // 特殊处理
            if(p.parent != null){
                if(p.data < p.parent.data){
                    p.parent.leftLine._collection[1].x -= args.distancePAndGp/50;
                    p.parent.leftLine._collection[1].x += args.x/50;;
                }else{
                    p.parent.rightLine._collection[1].x -= args.distancePAndGp/50;
                    p.parent.rightLine._collection[1].x += args.x/50;;
                }
            }

            two.update();
            if(count>=50){
                resolve();
                window.clearInterval(timer);
            }
        },10/animationSpeed);
    })
    
    // p 作为新插入结点继续修正
    // 因为p是黑色的所以不用继续迭代
    // fixupRBTreeNoAnimation(p);
    promise.then(()=>{isAnimation = false;})
}

/**
 * 红黑树
 * 四节点情况
 * 变颜色，有动画
 * @param {RBTreeNode} node 
 */
function RBTreeFourNodeDiscoloration(node) {
    let gp = node.parent.parent;
    let promise = new Promise((resolve,reject)=>{
        let timeout = setTimeout(()=>{
            node.color = COLORS.RED;
            gp.color = COLORS.RED;
            gp.leftTree.color = COLORS.BLACK;
            gp.rightTree.color = COLORS.BLACK;
            node.resetNode();
            gp.resetNode();
            gp.leftTree.resetNode();
            gp.rightTree.resetNode();
            resolve();
            window.clearTimeout(timeout);
        },400/animationSpeed);
    })
    promise.then(()=>{
        fixupRBTree(gp);
    });
    
}

function findRBTreeNode(data) {
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
        },800/animationSpeed);
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
            },800/animationSpeed);
        }else{
            isAnimation = false;
            promptMessage("不存在");
        }
    });
}