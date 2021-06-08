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
    for(let i =1;i<length-1;i++){
        if(!isNaN(str[i])){
            let flag = 0;
            let a = str[i]-0;
            i++;
            while(i<length-1 && ((!isNaN(str[i]))|| str[i] === '.')){
                if(str[i] === '.'){flag ++;}
                if(flag>1){return false};
                a = a+str[i];
                i++;
            }
            i--;
            a = a-0;
            stack.push(a);
        }
        if(str[i] === ','){
            let a = stack.pop();
            console.log("a",a);
            if(a === null||isNaN(a)){
                return false;
            }
        }
        console.log("str["+i+"]",str[i],str[i] != ','&& (isNaN(str[i]-0)||(str[i]-0<0||str[i]-0>9)))
        if(str[i] != ','&& (str[i]-0<0||str[i]-0>9)){
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