$(()=>{
    const fContainer = $(".functionContainer")[0];
    var str = $("input[type=radio][name=radio]:checked")[0].nextElementSibling.innerText;

    function init(){
        treeArray = null;
        root = null;
        two.clear();
        two.update();
    }
    radioView(str);

    $("input[type=radio][name=radio]").change(()=>{
        str = $("input[type=radio][name=radio]:checked")[0].nextElementSibling.innerText;
        radioView(str);
    });

    function radioView(str) {
        init();
        if(str === "二叉树"){
            setBinaryTree();
        }
        if(str === "二叉搜索树"){
            setBST();
        }
        if(str === "AVL树"){
            setAVLTree();
        }
        if(str === "红黑树"){
            setRBTree();
        }
    }

    function setBinaryTree(){
        console.log("BT");
        fContainer.innerHTML = `
        <div>
            <input id="treeArrayInput" type="text" placeholder="树数组,例如:[1,[],[]]">
            <button class="button" id="drawTree" >画树</button>
        </div>
        <div>
            <input id="searchInput" type="text" placeholder="待查找的数">
            <button class="button" id="searchButton">查找</button>
        </div>
        <div>
            <button class="button" id="VLRButton">前序遍历</button>
        </div>
        <div>
            <button class="button" id="LDRButton">中序遍历</button>
        </div>
        <div>
            <button class="button" id="LRDButton">后序遍历</button>
        </div>
        `;
        
        $('#drawTree').click(drawTree);
        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});
        $("#searchButton").click(()=>{findNode();});
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
        $("#searchInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#searchButton").click();
            }
        })
    };

    function setBST() {
        console.log("BST");
        fContainer.innerHTML = `
        <div>
            <input id="treeArrayInput" type="text" placeholder="树数组,例如:[1,2,3,4,5]">
            <button class="button" id="drawTree" >画树</button>
        </div>
        <div>
            <input id="searchInput" type="text" placeholder="待查找的数">
            <button class="button" id="searchButton">查找</button>
        </div>
        <div>
            <input id="addInput" type="text">
            <button class="button" id="addButton">添加</button>
        </div>
        <div>
            <input id="deleteInput" type="text" placeholder="待删除的数">
            <button class="button" id="deleteButton">删除</button>
        </div>
        <div>
            <button class="button" id="VLRButton">前序遍历</button>
        </div>
        <div>
            <button class="button" id="LDRButton">中序遍历</button>
        </div>
        <div>
            <button class="button" id="LRDButton">后序遍历</button>
        </div>
        <div>
            <button class="button" id="testButton">测试</button>
        </div>
        `;
        $("#addInput")[0].value = "1,22";
        $("#treeArrayInput")[0].value = "[1,3,5,6,7,8]";
        $('#drawTree').click(()=>{drawBSTree("BST");});
        $("#addButton").click(()=>{
            console.log("点了添加");
            let str = $("#addInput")[0].value;
            array = str.split(",");
            for(let i = 0;i<array.length;i++){
                if(isNaN(array[i])){
                    console.log("请重新输入数组");
                    return;
                }else{
                    array[i] -= 0;
                }
            }
            console.log(array);
            for(let i =0;i<array.length;i++){
                console.log("array:",i,array[i]);
                console.log(root);
                insertBSTNode(root,array[i]);   
            }
            two.update();
           
            
        });
        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});
        $("#searchButton").click(()=>{findBSTNode();});
        $("#deleteButton").click(()=>{
            alert("还没写呢！");
        })
        $("#deleteInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#deleteButton").click();
            }
        })
    }

    function setAVLTree() {
        console.log("AVL");
        fContainer.innerHTML = 
        `
        <div>
            <input id="treeArrayInput" type="text" placeholder="树数组,例如:[1,2,3,4,5]">
            <button class="button" id="drawTree" >画树</button>
        </div>
        <div>
            <input id="searchInput" type="text" placeholder="待查找的数">
            <button class="button" id="searchButton">查找</button>
        </div>
        <div>
            <input id="addInput" type="text">
            <button class="button" id="addButton">添加</button>
        </div>
        <div>
            <input id="deleteInput" type="text" placeholder="待删除的数">
            <button class="button" id="deleteButton">删除</button>
        </div>
        <div>
            <button class="button" id="VLRButton">前序遍历</button>
        </div>
        <div>
            <button class="button" id="LDRButton">中序遍历</button>
        </div>
        <div>
            <button class="button" id="LRDButton">后序遍历</button>
        </div>
        <div>
            <div class="radio">
                <input id="radio_auto" name="fixed_model" type="radio" checked>
                <label for="radio_auto" class="radio-label">自动修正</label>
            </div>
            <div class="radio">
                <input id="radio_manual" name="fixed_model" type="radio" disabled>
                <label for="radio_manual" class="radio-label">手动修正</label>
            </div>
        </div>
        <div>
            <button class="button" id="fixupButton">修正</button>
        </div>
        `;
        
        
        $("#addInput")[0].value = "1,22";
        $("#treeArrayInput")[0].value = "[1,3,5,6,7,8]";
        $('#drawTree').click(()=>{
            drawBSTree("AVL");
        });
        $("#searchButton").click(()=>{findBSTNode();});
        $("#addButton").click(()=>{
            console.log("点了添加");
            let str = $("#addInput")[0].value;
            $("#addInput")[0].value = "";
            $("#addInput").attr("disabled",true);
            array = str.split(",");
            for(let i = 0;i<array.length;i++){
                if(isNaN(array[i])){
                    console.log("请重新输入数组");
                    $("#addInput").attr("disabled",false);
                    return;
                }else if(array[i] === ""){
                    console.log("请重新输入数组");
                    $("#addInput").attr("disabled",false);
                    return;
                }else{
                    array[i] -= 0;
                }
            }
            console.log(array);
            let promise = new Promise((resolve,reject)=>{
                for(let i =0;i<array.length;i++){
                    isAnimation = true;
                    console.log("array:",i,array[i]);
                    insertAVLTreeNode(array[i]);   
                }
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },200);
            });
            promise.then(()=>{
                $("#addInput").attr("disabled",false);
            });
            two.update();
            
        })
        $("#deleteButton").click(()=>{
            alert("还没写呢！");
        })
        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});

        $("button#fixupButton").attr("disabled",true);
        // 修正模式按钮
        $("input[type=radio][name=fixed_model]").change(()=>{
            str = $("input[type=radio][name=fixed_model]:checked")[0].nextElementSibling.innerText;
            console.log(str);
            if(str === "自动修正"){
                $("button#fixupButton").attr("disabled",true);

            }
            if(str === "手动修正"){
                $("button#fixupButton").attr("disabled",false);

            }
        })
        $("button#fixupButton").click(()=>{
            console.log("点击了");
        })
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
        $("#addInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#addButton').click();
            }
        });
        $("#searchInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#searchButton").click();
            }
        })
        $("#deleteInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#deleteButton").click();
            }
        })
    }

    function setRBTree() {
        console.log("Red-Black-Tree");
        fContainer.innerHTML = 
        `
        <div>
            <input id="treeArrayInput" type="text" placeholder="树数组,例如:[1,2,3,4,5]">
            <button class="button" id="drawTree" >画树</button>
        </div>
        <div>
            <input id="searchInput" type="text" placeholder="待查找的数">
            <button class="button" id="searchButton">查找</button>
        </div>
        <div>
            <input id="addInput" type="text">
            <button class="button" id="addButton">添加</button>
        </div>
        <div>
            <input id="deleteInput" type="text" placeholder="待删除的数">
            <button class="button" id="deleteButton">删除</button>
        </div>
        <div>
            <button class="button" id="VLRButton">前序遍历</button>
        </div>
        <div>
            <button class="button" id="LDRButton">中序遍历</button>
        </div>
        <div>
            <button class="button" id="LRDButton">后序遍历</button>
        </div>
        <div>
            <div class="radio">
                <input id="radio_auto" name="fixed_model" type="radio" checked>
                <label for="radio_auto" class="radio-label">自动修正</label>
            </div>
            <div class="radio">
                <input id="radio_manual" name="fixed_model" type="radio" disabled>
                <label for="radio_manual" class="radio-label">手动修正</label>
            </div>
        </div>
        <div>
            <button class="button" id="fixupButton">修正</button>
        </div>
        `;
        $("#treeArrayInput")[0].value = "[1,2,4,5]";
        // 画树
        $('#drawTree').click(()=>{
            init();
            let str = $("#treeArrayInput")[0].value;
            console.log("str",str);
            if(!isOneDimensionalArray(str)){
                console.log("请重新输入初始化数组");
                return ;
            }
            str = removeStringBlank(str);
            str = str.substring(1,str.length-1);
            if(str === ""){
                init();
                return;
            }
            array = str.split(",");
            array = charArray2NumberArray(array);
            drawRBTree(array);
        });

        $("#addInput")[0].value = "1,22";
        $("#addButton").click(()=>{
            
            let str = $("#addInput")[0].value;
            if(str === ""){
                return;
            }
            if(!isAddSequence(str)){
                console.log("请输入合法增加序列");
                return;
            }
            // 如果合法
            array = str.split(",");
            array = charArray2NumberArray(array);
            let data = array.pop();
            if(array.length > 0){
                insertRBTreeNodeArray(array);
            }
            $("#addInput")[0].value = "";
            $(".functionContainer > button").attr("disabled",true);
            $(".functionContainer > input").attr("disabled",true);

            let promise = new Promise((resolve,reject)=>{
                isAnimation = true;
                insertRBTreeNode(root,data);
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            });

            promise.then(()=>{
                $(".functionContainer > button").attr("disabled",false);
                $(".functionContainer > input").attr("disabled",false);
            })
            
        });

        
        $("#searchButton").click(()=>{
            
            let searchValue = $("#searchInput")[0].value;
            $("#searchInput")[0].value = "";
            if(searchValue === ""||isNaN(searchValue)){
                console.log("请输入数字");
                return;
            }
            isAnimation = true;
            $("button").attr("disabled",true);
            $("input").attr("disabled",true);
            searchValue -=0;
            console.log(searchValue);
            console.log("searchValue",searchValue);
            let promise = new Promise((resolve)=>{
                findRBTreeNode(searchValue);
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            })
            
            promise.then(()=>{
                $(".functionContainer > button").attr("disabled",false);
                $(".functionContainer > input").attr("disabled",false);
            })
            
        });
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
        $("#addInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#addButton').click();
            }
        });
        $("#searchInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#searchButton").click();
            }
        })
        
    }
})

