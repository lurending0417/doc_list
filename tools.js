
//十六进制随机颜色（基于random()函数）
let randomColorSixteen = function(){
	let str = "0123456789abcdef";
	let j = 0;
	let color = "#";
	for(let i=0;i<6;i++){
		j = random(15);
		color += str[j];
	}
	return color;
}
//rgba随机颜色（基于random()函数）
let randomColorRgba = function(){
	let r = random(100,255);
	let g = random(100,255);
	let b = random(100,255);
	let a = Math.random().toFixed(1);
	// let color = "rgba("+r+","+g+","+b+","+a+")";
	let color = `rgba(${r},${g},${b},${a})`;
	return color;
}
// 获取随机数，random(8):获取0-8之间的随机数
let random = function(start,end){
	if(!end){
		return Math.floor(Math.random()*start);
	}else{
		return Math.floor(Math.random()*(end-start)+start);
	}
}
// 打乱数组
let shuffle = function(ary) {
    for (let i = 0; i < ary.length; i++) {
        let r = random(ary.length - 1);
        let temp = ary[i];
        ary[i] = ary[r];
        ary[r] = temp;
    }
}
// 获取本地localStorage,如果没有则创建一个新的localStorage对象，默认值为defaultValue
let getStorage = function(key,defaultValue){
	let obj = localStorage[key];
	if(!obj){
		obj = defaultValue;
	}else{
		obj = JSON.parse(obj);
	}
	return obj;
}
// 设置本地localStorage
let setStorage = function(key,obj){
	localStorage[key] = JSON.stringify(obj);
}

// 比较基本类型（NaN,Infinity……）
let is = function(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

// 比较两个对象
let shallowEqual = function(objA, objB) {
    if (is(objA, objB)) return true

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false
    }

    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) return false

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])) {
            return false
        }
    }

    return true
}

const query2Object = str => {
	if (!str) {
		return {}
	}
	if (/\?/.test(str)) {
		str = str.replace(/.*\?/g, "")
	}
	return str.split("&").reduce((last, now) => {
		const rs = now.split("=");
		if (rs.length == 2) {
			last[rs[0]] = decodeURIComponent(rs[1]);
		}
		return last;
	}, {})
}

const object2Query = body => {
	return Object.keys(body || {}).reduce((last, key) => {
		let v = typeof body[key] == 'object' ? JSON.stringify(body[key]) : body[key];
		last += (last ? "&" : "") + key + "=" + (v);
		return last;
	}, "") || ""
}