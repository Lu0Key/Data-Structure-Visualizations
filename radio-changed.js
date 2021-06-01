$(()=>{
    const fContainer = $(".functionContainer")[0];
    var str = $("input[type=radio][name=radio]:checked")[0].nextElementSibling.innerText;


    radioView(str);

    $("input[type=radio][name=radio]").change(()=>{
        str = $("input[type=radio][name=radio]:checked")[0].nextElementSibling.innerText;
        radioView(str);
    });

    function radioView(str) {
        treeArray = null;
        root = null;
        if(str === "二叉树"){
            setBinaryTree();
        }
        if(str === "二叉搜索树"){
            setBST();
        }
        if(str === "AVL树"){
            setAVLTree();
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
        $('#drawTree').click(drawBSTree);
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
    }

    function setAVLTree(param) {
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
                <input id="radio_manual" name="fixed_model" type="radio">
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
            alert("还没写呢！");
        });
        $("#searchButton").click(()=>{findBSTNode();});
        $("#addButton").click(()=>{
            alert("还没写呢！");
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
    }
})

