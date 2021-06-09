// 二叉树类
function Tree(data) {
    this.data = data;
    this.x = 0;
    this.y = 0;
    this.parent    = null;
    this.circle    = null;
    this.leftTree  = null;
    this.rightTree = null;
    this.leftLine  = null;
    this.rightLine = null;
    this.text      = null;
    
    this.drawTreeNode = ()=>{
        if(this.circle != null){this.circle.remove();}
        if(this.text != null){this.text.remove();}
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

    // ---------
    // |  向右+x(正)
    // |  向上+y(正)
    this.nodeUp = (x,y)=>{
        this.x += x;
        this.y -= y;
        if(this.circle != null){
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
        this.text = new Two.Text(this.data+"",this.x,this.y,"normal");
        two.add(this.text);
        two.update();
    }
}

function drawBinaryTree(array) {
    initTreeData(array);
    drawTreeImage();
}


function initTreeData(array) {
    if(array == null||array.length === 0){
        root = null;
        promptMessage("已清空画布");
        return;
    }
    root = createTree(array);
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
    setPosition(node.leftTree,w-distant,h+params.verticalSpacing,distant/2);
    setPosition(node.rightTree,w+distant,h+params.verticalSpacing,distant/2);
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
    node.drawTreeNode();
    drawTreeNode(node.leftTree);
    drawTreeNode(node.rightTree);
}