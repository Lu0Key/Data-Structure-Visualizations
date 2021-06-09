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
        console.log("Binary Tree");
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
        
        // 初始化树序列
        $("#treeArrayInput")[0].value = "[1,[],[]]";
        // 绑定回车事件
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
        // 画树
        $('#drawTree').click(()=>{
            init();
            let input = $("#treeArrayInput")[0];
            let inputValue = input.value;
            // 如果判断有问题直接停止函数
            console.log(inputValue);
            if(!judgeStr2Array(inputValue)){ return; }
            array = JSON.parse(inputValue);
            if(!judgeArray(array)){
                treeArray = null;
                promptMessage("请检查子数组");
                return;
            }
            console.log("绘画中...");
            drawBinaryTree(array);
            console.log("画好惹!");
        });


        // 回车事件
        $("#searchInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#searchButton").click();
            }
        })
        // 搜索点击
        SeachBindOnclick(findBinaryTreeNode);


        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});
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
        `;

        // 初始化输入数组
        $("#treeArrayInput")[0].value = "[1,3,5,6,7,8]";
        // 绑定回车事件
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
        // 画树点击
        $('#drawTree').click(()=>{
            init();
            let inputValue = $("#treeArrayInput")[0].value;
            if(!isOneDimensionalArray(inputValue)){
                promptMessage("请输入正确数组");
                return;
            }
            array = JSON.parse(inputValue);
            drawBSTree(array);
        });

        
        // 绑定搜索事件
        SeachBindOnclick(findBSTreeNode);

        // 初始化添加序列
        $("#addInput")[0].value = "1,22";
        // 绑定回车事件
        $("#addInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#addButton').click();
            }
        });
        // 添加点击
        $("#addButton").click(()=>{
            console.log("点了添加");
            let str = $("#addInput")[0].value;
            if(!isAddSequence(str)){
                console.log("请输入合法增加序列");
                return;
            }

            // 如果合法
            array = str.split(",");
            array = charArray2NumberArray(array);
            let data = array.pop();
            if(array.length > 0){
                insertBSTNodeArray(array);
            }
            $("#addInput")[0].value = "";
            $(".functionContainer > div > button").attr("disabled",true);
            $(".functionContainer > div > input").attr("disabled",true);
            let promise = new Promise((resolve,reject)=>{
                isAnimation = true;
                let timeout = setTimeout(()=>{
                    insertBSTreeNode(root,data);
                    window.clearTimeout(timeout);
                },500);
                
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            });

            promise.then(()=>{
                $(".functionContainer > div > button").attr("disabled",false);
                $(".functionContainer > div > input").attr("disabled",false);
            })
           
            
        });

        /**
         * 这里应该还要写删除函数
         */
        $("#deleteInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#deleteButton').click();
            }
        });
        $("#deleteButton").click(()=>{
            $("#deleteInput").value = "";
            promptMessage("太难了，写不出来");
        })
        
        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});

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
        
        
        // 设初始值
        $("#treeArrayInput")[0].value = "[4,3]";
        // 绑定回车事件
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
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
            drawAVLTree(array);
        });

        // 绑定搜索
        SeachBindOnclick(findBSTreeNode);;

        // 设置初始值
        $("#addInput")[0].value = "1,22";
        // 绑定事件
        $("#addInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#addButton').click();
            }
        });
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
                insertAVLTreeNodeArray(array);
            }
            $("#addInput")[0].value = "";
            $(".functionContainer > div > button").attr("disabled",true);
            $(".functionContainer > div > input").attr("disabled",true);
            let promise = new Promise((resolve,reject)=>{
                isAnimation = true;
                let timeout = setTimeout(()=>{
                    insertAVLTreeNode(root,data);
                    window.clearTimeout(timeout);
                },500);
                
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            });

            promise.then(()=>{
                $(".functionContainer > div > button").attr("disabled",false);
                $(".functionContainer > div > input").attr("disabled",false);
            })
            
            
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
            <button class="button" id="addButton" placeholder="插入序列">添加</button>
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
        // 设置初始值
        $("#treeArrayInput")[0].value = "[1,2,4,5]";
        // 绑定回车事件
        $("#treeArrayInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#drawTree').click();
            }
        });
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

        // 绑定搜索
        SeachBindOnclick(findBSTreeNode);
        


        // 设置插入的初始序列
        $("#addInput")[0].value = "1,22";
        // 绑定回车事件
        $("#addInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#addButton').click();
            }
        });
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
            $(".functionContainer > div > button").attr("disabled",true);
            $(".functionContainer > div > input").attr("disabled",true);
            let promise = new Promise((resolve,reject)=>{
                isAnimation = true;
                let timeout = setTimeout(()=>{
                    insertRBTreeNode(root,data);
                    window.clearTimeout(timeout);
                },500);
                
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            });

            promise.then(()=>{
                $(".functionContainer > div > button").attr("disabled",false);
                $(".functionContainer > div > input").attr("disabled",false);
            })
            
        });

        /**
         * 这里应该还要写删除函数
         */
        $("#deleteInput").keydown((e)=>{
            if(e.keyCode===13){
                $('#deleteButton').click();
            }
        });
        $("#deleteButton").click(()=>{
            $("#deleteInput").value = "";
            promptMessage("太难了，写不出来");
        })

        
        // 三种遍历
        $("#VLRButton,#LDRButton,#LRDButton").click((e)=>{order(e.currentTarget.textContent);});
    }

    function SeachBindOnclick(findNodeFunction) {
        // 搜索
        $("#searchButton").click(()=>{
            let searchValue = $("#searchInput")[0].value;
            $("#searchInput")[0].value = "";
            if(searchValue === ""||isNaN(searchValue)){
                console.log("请输入数字");
                return;
            }
            isAnimation = true;
            $(".functionContainer > div > button").attr("disabled",true);
            $(".functionContainer > div > input").attr("disabled",true);
            searchValue -=0;
            console.log(searchValue);
            console.log("searchValue",searchValue);
            let promise = new Promise((resolve)=>{
                findNodeFunction(searchValue);
                let timer = setInterval(()=>{
                    if(!isAnimation){
                        resolve();
                        window.clearInterval(timer);
                    }
                },10);
            })
            
            promise.then(()=>{
                console.log("恢复");
                $(".functionContainer > div > button").attr("disabled",false);
                $(".functionContainer > div > input").attr("disabled",false);
            })
            
        });
        // 绑定事件
        $("#searchInput").keydown((e)=>{
            if(e.keyCode===13){
                $("#searchButton").click();
            }
        })
    }
})

