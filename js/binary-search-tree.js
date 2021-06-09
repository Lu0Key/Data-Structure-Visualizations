

function drawBSTree(array) {
    insertBSTreeNodeArray(array);
    drawTreeImage();
}

function insertBSTreeNodeArray(array) {
    for(let i = 0 ;i<array.length;i++){
        insertBSTreeNodeNoAnimation(root,array[i]);
    }
}

function insertBSTreeNodeNoAnimation(node,data) {
    
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
            fixupBSTreePositionNoAnimation(node.leftTree);
        }else{
            insertBSTreeNodeNoAnimation(node.leftTree,data);
        }
    }else{
    // 大于等于自身的才放右边
    // 右边
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
            fixupBSTreePositionNoAnimation(node.rightTree);
        }else{
            insertBSTreeNodeNoAnimation(node.rightTree,data);
        }
    }
}

/**
 * 无动画
 * 初步调整BST类结点的位置
 * @param {BSTNode} node 
 * @returns 
 */
function fixupBSTreePositionNoAnimation(node) {
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

function insertBSTreeNode(node,data) {
    if(root === null){
        root = new Tree(data);
        fixupBSTreePosition(root);
        root.drawTreeNode();
        isAnimation = false;
        return;
    }
    // 小于结点就在左边
    if(data < node.data){
        if(node.leftTree === null){
            node.leftTree = new Tree(data);
            node.leftTree.parent = node;
            fixupBSTreePosition(node.leftTree);
        } else {
            insertBSTreeNode(node.leftTree,data);
        }
    } else {
        if(node.rightTree === null){
            node.rightTree = new Tree(data);
            node.rightTree.parent = node;
            fixupBSTreePosition(node.rightTree);
        } else {
            insertBSTreeNode(node.rightTree,data);
        }
    }
}

/**
 * 有动画
 * 初步调整BST类节点的位置
 * @param {BSTNode} node 
 * @returns 
 */
function fixupBSTreePosition(node,nextFixupFunciotn = null){
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
        // fixupRBTree(node);
        isAnimation = false;
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
        // BST 不用修正
        if(nextFixupFunciotn === null){
            isAnimation = false;
        }else{
            nextFixupFunciotn(node);
        }
    })
}