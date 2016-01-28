var DOM={};//命名空间，或叫名字空间。单例模式
DOM.getIndex=function (ele){//获得ele的索引值
	var index=0;
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			index++	
		}
		p=p.previousSibling;
	}
	return index;
}

DOM.siblings=function (ele){//获得ele的所有的元素兄弟节点
	var nodes=ele.parentNode.childNodes;
	var a=[];
	for(var i=0;i<nodes.length;i++){
		var node=nodes[i];
		if(node!=ele&&node.nodeType==1){
			a.push(node);	
		}
	}
	return a;
}

function siblings(ele){
	var a=[];
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType==1){
			//a.unshift(p);
			a.push(p);
			[0,1,2,3,4,5]
			[5,4,3,2,1,0]
		}
		p=p.previousSibling;
	}
	a.reverse();
	var n=ele.nextSibling;
	while(n){
		if(n.nodeType===1){
			a.push(n);	
		}
		n=n.nextSibling;
	}
	return a;
}

//从以上的siblings方法里，还可以演化出另外三个方法来：只找哥哥们，只找弟弟们，只找相邻的哥哥和弟弟（返回的元素最多只有两个）
//还可以再有两个方法：只找相邻的那一个哥哥，或只找相邻的那一个弟弟
DOM.prevSiblings=function (ele){//找ele的哥哥们
	var nodes=ele.parentNode.childNodes;
	var a=[];
	for(var i=0;i<nodes.length;i++){
		var node=nodes[i];
		if(node==ele)break;//找哥哥其实就是遇到自己就返回
		if(node.nodeType==1){
			a.push(node);	
		}
	}
	return a;
}
DOM.nextSiblings=function (ele){//找弟弟们
	var nodes=ele.parentNode.childNodes;
	var a=[];
	for(var i=nodes.length-1;i>=0;i--){
		var node=nodes[i];
		if(node==ele)break;
		if(node.nodeType==1){
			a.unshift(node);
			//假设4是它自己：4-5-6-7-8-9	
			//push方式：[9,8,7,6,5]
			//unshift方法[5,6,7,8,9]
		}
	}
	return a;
	
}
DOM.prev=function (ele){//找相邻的唯一的哥哥
	/*var a=prevSiblings(ele);
	return a[a.length-1]*/
	if(ele.previousElementSibling){
		return ele.previousElementSibling;	
	}
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType==1){
			return p;	
		}
		p=p.previousSibling;
	}
	return null;//表示此方法应该有返回，但是得到不，则应该返回null
	//如果不写这个return null，找不到结果，则返回undefined
}
//null和undefined都表示没有，不存在
//一个主动的结果，一个被动的结果
DOM.next=function (ele){//找相邻的唯一的弟弟
	//return DOM.nextSiblings(ele)[0];
	var n=ele.nextSibling;
	while(n){
		if(n.nodeType===1){
			return n;
		}
		n=n.nextSibling;
	}
	return null;//表示这个方法应该有返回值，但是找不到，则表示礼貌返回一个null
}

DOM.closest=function (ele){//找相邻的弟弟和哥哥
	//return [prev(ele),next(ele)]
	var p=DOM.prev(ele);
	var n=DOM.next(ele);
	var a=[];
	if(p) a.push(p);
	if(n) a.push(n);
	return a;//a可以是空数组
}

DOM.children=function(ele){
	var children=ele.children;
	//if(!ele.nextElementSibling){//通过这样的判断来判断出这是IE
	//typeof null =="object";
	//typeof ele
	//null,undefined;
	//null和undefined都标识类型，用来标识不存在的状态
	//null是个主动的状态，undefined是个无意的，被动的状态
	//三种值类型，对象和function，undefined,但是把null也归到类型里来讲了
	
	//如果科学严谨的判断一个DOM元素是否支持某个属性呢？
	//最好的办法是 typeof ele.attribute =="object";
	//尽量不要用if(ele.attribute)的方法
	//if(typeof ele.nextElementSibling =="undefined"){
	if(typeof ele.nextElementSibling!="object"){//做这个判断的目的是避免在标准浏览器里做遍历筛选
		var a=[];
		//ele.childNodes 它包含更多类型的子节点10
		//ele.children;//它只可能包含元素和注释节点，所以性能更好，效率更高 children不包括文本节，
		for(var i=0;i<children.length;i++){
			var child=children[i];
			if(child.nodeType===1){
				a.push(child);	
			}		
		}
		return a;
	}
	return children;//如果是标准浏览器，把children返回就好。如果能确保HTML页面里没有注释节点，那就不需要写这个方法了
	
};

DOM.children=function(ele){//获得ele的所有的元素子节点
	var children=ele.children;
	if(typeof ele.nextElementSibling !="object"){
		var a=[];
		for(var i=0;i<children.length;i++){
			if(children[i].nodeType===1){
				a.push(children[i]);
			}
		}
	}
	return children;
}

DOM.getElesByClass=function (str){
	/*if(document.getElementsByClassName){
		return document.getElementsByClassName(str);	
	}*/
	str=str.replace(/^ +| +$/g,"");
	//str=str.replace(/ {2,}/g," ");
	var aClass=str.split(/ +/);
	var eles=document.body.getElementsByTagName("*");
	for(var i=0;i<aClass.length;i++){
		//eles=byClass(aClass[i],eles);
		
		var  reg=RegExp("(^| )"+aClass[i]+"( |$)");
		var a=[];
		for(var j=0;j<eles.length;j++){
			var ele=eles[j];
			if(reg.test(ele.className)){
				a.push(ele);	
			}
		}
		eles=a;//内部的筛选每完成一次，则更新一次eles
		
	}
	return eles;
}

DOM.addClass=function(ele,strClass){
	ele.className+=" "+strClass;
	//"ab " "ab ab"
	var  reg=RegExp("(^| )"+strClass+"( |$)");
	if(!reg.test(ele.className)){
		ele.className+=" "+strClass;
	}
}

DOM.removeClass=function(ele,strClass){
	var  reg=RegExp("(^| )"+strClass+"( |$)","g");
	
	ele.className=ele.className.replace(reg," ");//后边不是空，是空格
}