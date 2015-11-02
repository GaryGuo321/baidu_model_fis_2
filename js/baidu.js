/**
 * @require css/baidu.css
 * @require js/baidu.js
 * @require js/jquery.js
 */
$(function() {
	/*下拉列表*/
	/*
	使用了工厂模式
	标签切换需要做很多相同的操作，所以我认为利用工厂模式是一个比较好的方式，十分符合工厂模式的作用
	使用方便，整个代码运作工厂化，只需要告诉工厂你需要做什么样的操作，并利用闭包传递参数给流水线进行操作
	DropDown().dropList();
	*/
	function DropDown() {
		var o = new Object();
		o.dropList = function(element, relElement) {
			$(element).mouseover(function(event) {
				$(relElement).show();
			}).mouseout(function(event) {
				$(relElement).hide();
			});
			$(relElement).mouseover(function(event) {
				$(relElement).show();
			}).mouseout(function(event) {
				$(relElement).hide();
			})
		};
		return o;
	}
	// //天气下拉显示效果
	DropDown().dropList($(".weather"), $(".weather-frame"));
	//右侧用户设置，信息下拉显示效果
	DropDown().dropList($(".h-r-a .login"), $(".user"));
	DropDown().dropList($(".h-r-a .login-setting"), $(".user-setting"));
	DropDown().dropList($(".h-r-a .more"), $(".more-product"));

	/*框架切换*/
	function FrameSwitch() {
		var o = new Object();
		o.contentNavClick = function(element, relElement, className) {
			$(element).click(function() {
				var indexFrame = $(this).index();
				$(this).addClass(className).siblings().removeClass(className);
				$(relElement).eq(indexFrame).fadeIn(1000).siblings().fadeOut(1000);
			});
		};
		o.navSettingHover = function(element, relElement, changeBefore, changeAfter) {
			$(element).mouseover(function() {
				$(relElement).removeClass(changeBefore).addClass(changeAfter);
			}).mouseout(function() {
				$(relElement).addClass(changeBefore).removeClass(changeAfter);
			});
		};
		return o;
	}

	/*标签切换*/
	/*
	使用了工厂模式
	标签切换需要做很多相同的操作，所以我认为利用工厂模式是一个比较好的方式，十分符合工厂模式的作用
	使用方便，整个代码运作工厂化，只需要告诉工厂你需要做什么样的操作，并利用闭包传递参数给流水线进行操作
	TabSwitch.tabFactory(操作)(必包参数);
	 */
	var TabSwitch = {};
	TabSwitch.tabHover = function() {
		return function(element, className) {
			$(element).mouseover(function(event) {
				$(this).addClass(className).siblings().removeClass(className);
			}).mouseout(function(event) {
				$(this).removeClass(className);
			});
		}
	};
	TabSwitch.tabClick = function() {
		return function(element, relElement, className) {
			$(element).click(function(event) {
				var index = $(this).index();
				$(this).addClass(className).siblings().removeClass(className);
				$(relElement).eq(index).show();
				$(relElement).eq(index).siblings().hide();
				return false;
			});
		}
	};
	TabSwitch.advHover = function() {
		return function(element, htmlLabel) {
			$(element).mouseover(function() {
				$(this).children(htmlLabel).show();
			}).mouseout(function() {
				$(this).children(htmlLabel).hide();
			});
		}
	};
	TabSwitch.itemHover = function() {
		return function(element, classOne, classTwo, htmlLabel, classNameOne, classNameTwo) {
			$(element).mouseover(function() {
				$(this).children(classOne).addClass(classNameOne);
				$(this).children(classOne).children(classTwo).children(htmlLabel).addClass(classNameTwo);
			}).mouseout(function() {
				$(this).children(classOne).removeClass(classNameOne);
				$(this).children(classOne).children(classTwo).children(htmlLabel).removeClass(classNameTwo);
			});
		}
	};
	TabSwitch.tabFactory = function(para) {
		return new TabSwitch[para]();
	};
	/*轮播窗口*/
	function Banner() {}
	Banner.prototype = {
		constructor: Banner,
		smallImgClick: function(element, relElement, classNameBefore, classNameAfter) {
			$(element).click(function() {
				var index = $(this).index();
				$(element).eq(index).addClass(classNameAfter).removeClass(classNameBefore);
				$(element).eq(index).siblings().addClass(classNameBefore).removeClass(classNameAfter);
				$(relElement).eq(index).show().siblings().hide();
				smallNavMove(index);
				return false;
			});
		},
		abovePic: function(element) {
			$(element).mouseover(function() {
				clearInterval(adTimer);
			}).mouseout(function() {
				adTimer = setInterval(timer, 5000);
			})
		},
		arrowRightClick: function(element, relElement, classNameBefore, classNameAfter, maxIndex, minIndex) {
			$(element).click(function() {
				$(relElement).each(function(index, element) {
					var spanClass = $(this).attr("class");
					if (spanClass == classNameAfter) {
						indexNum = index + 1;
					}
				});
				smallNavMove(indexNum);
				if (indexNum == maxIndex + 1) {
					indexNum = minIndex;
				}
				$smallImg.eq(indexNum).addClass(classNameAfter).removeClass(classNameBefore);
				$smallImg.eq(indexNum).siblings().addClass(classNameBefore).removeClass(classNameAfter);
				$bannerPic.eq(indexNum).show().siblings().hide();
			});
		},
		arrowLeftClick: function(element, relElement, classNameBefore, classNameAfter, maxIndex, minIndex) {
			$leftArrow.click(function() {
				$(relElement).each(function(index, element) {
					var spanClass = $(this).attr("class");
					if (spanClass == classNameAfter) {
						indexNum = index - 1;
					}
				});
				smallNavMove(indexNum);
				if (indexNum == minIndex - 1) {
					indexNum = maxIndex;
				}
				$smallImg.eq(indexNum).addClass(classNameAfter).removeClass(classNameBefore);
				$smallImg.eq(indexNum).siblings().addClass(classNameBefore).removeClass(classNameAfter);
				$bannerPic.eq(indexNum).show().siblings().hide();
			});
		}
	};

	//内容框架切换效果
	$contentNavA = $(".content-nav li");
	$contentNavA.eq(1).addClass("navclick");
	$contenFrame = $(".content-frame");
	$contenFrame.eq(1).show(); //默认显示第二个框
	//位于导航栏上的效果
	TabSwitch.tabFactory('tabHover')($contentNavA, "hover");
	TabSwitch.tabFactory('tabHover')($(".nav-setting"), "hover");
	//点击导航栏后的效果
	//在设置上面的效果
	FrameSwitch().contentNavClick($contentNavA, $contenFrame, "navclick");
	FrameSwitch().navSettingHover($(".nav-setting"), $(".nav-setting i"), "change-normal", "change-bg");


	//第一个小窗口效果设置
	$MyNav = $(".my-nav");
	$reNav = $(".recon-nav");
	$addNav = $(".add-nav");
	$conOneBot = $(".con-one-bot");

	$conOneBot.eq(0).show();
	TabSwitch.tabFactory('tabClick')($MyNav, $conOneBot, "click-title-change"); //我的导航
	TabSwitch.tabFactory('tabClick')($reNav, $conOneBot, "click-title-change"); //推荐导航
	TabSwitch.tabFactory('advHover')($(".web-img a"), "span"); //广告标签hover

	//第二个小窗口效果设置
	//点击小图标切换效果
	$smallImg = $(".small-img-nav a");
	$bannerPic = $(".banner-pic");
	var pictureBanner = new Banner();
	pictureBanner.smallImgClick($smallImg, $bannerPic, "small-img-sty", "small-img-sty-change");
	//点击箭头滑动banner
	$leftArrow = $(".left-arrow");
	$rightArrow = $(".right-arrow");
	$contentTwoLeft = $(".content-two-left");
	DropDown().dropList($contentTwoLeft, $leftArrow); //左箭头
	DropDown().dropList($contentTwoLeft, $rightArrow); //右箭头
	pictureBanner.abovePic($contentTwoLeft); //位于图片上时停止时间轮播
	//点击右箭头
	pictureBanner.arrowRightClick($rightArrow, $smallImg, "small-img-sty", "small-img-sty-change", 6, 0);
	//点击左箭头
	pictureBanner.arrowLeftClick($leftArrow, $smallImg, "small-img-sty", "small-img-sty-change", 6, 0);
	//指定时间执行banner切换
	var adTimer = setInterval(timer, 5000);

	function timer() {
		$smallImg.each(function(index, element) {
			var spanClass = $(this).attr("class");
			if (spanClass == "small-img-sty-change") {
				indexNum = index + 1;
			}
		});
		smallNavMove(indexNum);
		if (indexNum == 7) {
			indexNum = 0;
		}
		$smallImg.eq(indexNum).addClass("small-img-sty-change").removeClass("small-img-sty");
		$smallImg.eq(indexNum).siblings().addClass("small-img-sty").removeClass("small-img-sty-change");
		$bannerPic.eq(indexNum).show().siblings().hide();
	};
	//小图片窗口滑动
	function smallNavMove(index) {
		$smallImage = $(".small-img-nav");
		left = $smallImage.position().left;
		if (index == 4) {
			if (left == 0) $smallImage.animate({
				left: "-84px"
			}, "normal");
			left = -84;
		} else
		if (index == 5) {
			if (left == -84) $smallImage.animate({
				left: "-167px"
			}, "normal");
			left = -167;
		} else
		if (index == 2) {
			if (left == -167) $smallImage.animate({
				left: "-84px"
			}, "normal");
			left = -84;
		} else
		if (index == 1) {
			if (left == -84) $smallImage.animate({
				left: "0px"
			}, "normal");
			left = 0;
		} else
		if (index == 7) {
			if (left == -167) $smallImage.animate({
				left: "0px"
			}, "normal");
			left = 0;
		} else
		if (index == -1) {
			if (left == 0) $smallImage.animate({
				left: "-167px"
			}, "normal");
			left = -167;
		}
	}

	//第四个小窗口效果设置
	$(".con-four-top li").eq(0).addClass("four-top-click");
	$(".con-four-bottom").eq(0).show(); //默认显示第一个
	TabSwitch.tabFactory('tabHover')($(".con-four-top li"), "four-top-hover"); //广告标签hover
	TabSwitch.tabFactory('tabClick')($(".con-four-top li"), $(".con-four-bottom"), "four-top-click"); //点击标签
	//位于广告上面效果
	TabSwitch.tabFactory('itemHover')($(".gbuy-item"), ".gbuy-item-word", ".gbuy-pride", "span", "gbuy-item-height", "span-margin");

	//原生js部分更新日期
	function dates() {
		var mydate = new Date();
		var month = mydate.getMonth() + 1; //月
		var date = mydate.getDate(); //日
		var monthDate = document.getElementById("month-day");
		var string = month + "月" + date + "日";
		monthDate.innerHTML = string;
		monthDate.setAttribute("title", string);
	}
});