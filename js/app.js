let icons = ['fa fa-car fa-2x','fa fa-ambulance fa-2x','fa fa-plane fa-2x','fa fa-subway fa-2x','fa fa-wheelchair fa-2x','fa fa-rocket fa-2x','fa fa-fighter-jet fa-2x','fa fa-motorcycle fa-2x',
'fa fa-car fa-2x','fa fa-ambulance fa-2x','fa fa-plane fa-2x','fa fa-subway fa-2x','fa fa-wheelchair fa-2x','fa fa-rocket fa-2x','fa fa-fighter-jet fa-2x','fa fa-motorcycle fa-2x'];
//初始化界面
let aa = function(){
	let icons2 = [];
	$('td i').css('transform','rotateY(90deg)');
	$('td').css('background-color','#1b1818');
	var count = icons.length;
	for(let i = 0; i < count; i++){
		let num = Math.floor(Math.random()*icons.length);
		icons2.push(icons[num]);
		icons.splice(num,1);
	}
	for(let i = 0; i < icons2.length; i++){
		$($('td')[i].children).attr('class',icons2[i]);
	}
	icons = icons2;
};
//重置操作
$('.fa-refresh').click(function(){
	aa();
});

let num = 0;	//初始点击次数
let icons3 = [];	//存储已经翻开的牌
$('td').click(function(){
	let that = this;
	
	//设置判断重复点击
	if(!$(this).hasClass('open')){
		$(this).addClass('open');
		$(this).children().css('transform','rotateY(0)');
		$(this).css('background-color','#bac4c7');
		//增加步骤计数
		num++;
		//设置判断获取星数
		if(num <= 16 ){
			for(let i = 0; i < 3; i++){
				$($('.mov').children()[i]).attr('class','fa fa-star');
			}
		} else if(num <= 20){
			$($('.mov').children()[2]).attr('class','fa fa-star-o');
		} else if(num <= 30){
			$($('.mov').children()[2]).attr('class','fa fa-star-o');
			$($('.mov').children()[1]).attr('class','fa fa-star-o');
		} else if(num >30){
			for(let i = 0; i < 3; i++){
				$($('.mov').children()[i]).attr('class','fa fa-star-o');
			}
		}
		//修改DOM元素
		$('#moves')[0].innerHTML = num;
		if(num % 2 === 0){
			//第二次翻牌
			//判断第二次的翻牌是否与第一次翻的牌相同
			if($(this).children().removeClass('fa fa-2x').attr('class') !== icons3[icons3.length-1]){
				//两次翻牌结果不同
				$(this).children().addClass('fa fa-2x');
				setTimeout(function(){
					$(that).children().css('transform','rotateY(90deg)');
					$(that).css('background-color','#1b1818');
					$(that).removeClass('open');
					$(`.${icons3[icons3.length-1]}`).css('transform','rotateY(90deg)');
					$(`.${icons3[icons3.length-1]}`).parent().css('background-color','#1b1818');
					$(`.${icons3[icons3.length-1]}`).parent().removeClass('open');
					icons3.pop();
				},350);					
			} else {
				//两次翻牌结果相同
				icons3.push($(this).children().removeClass('fa fa-2x').attr('class'));
				$(this).children().addClass('fa fa-2x');
				//判断完成
				setTimeout(function(){
					if(icons3.length === 16){
						alert('success.');
					}
				},350);
				
			}
		}else{
			//第一次翻牌
			icons3.push($(this).children().removeClass('fa fa-2x').attr('class'));
			$(this).children().addClass('fa fa-2x');
		}
	} else{
		alert('请不要重复点击。');
	}
	
});

aa();