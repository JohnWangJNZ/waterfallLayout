window.onload = function () {
    
    waterfall('container', 'box');
    //scrollData can be replaced by data from server side...(ajax)
    var scrollData = {
        "data": [{ "height": "400", "color": "#c3c3c3" }, { "height": "200", "color": "#f100c3" },
            { "height": "600", "color": "#03f2c2" }, { "height": "150", "color": "#c2f32c" },
            { "height": "320", "color": "#1f2c3e" }, { "height": "200", "color": "#09c312" }]
    }
   

    window.onscroll = function () {
        //Check when to load new elements.
        if (checkDownload('container', 'box')) {
           
            var oContiner = document.getElementById('container');
            //get the new element insertation position.
            var index = getByClassName(oContiner, 'box').length+1;
            for (var i = 0; i < scrollData.data.length; i++) {
                // insert the new created element.
                var oBox = document.createElement('div');
                var oElement = document.createElement('div')
                oBox.className = 'box';
                oElement.className = 'element';
                oElement.style.height = scrollData.data[i].height + 'px';
                // console.log(oElement.style.height);
                oElement.innerHTML = index+i;
                oElement.style.background = scrollData.data[i].color;
                console.log(oElement.style.color);
                oBox.appendChild(oElement);
                oContiner.appendChild(oBox);
            }
            waterfall('container', 'box');
        }
    }

}

// when the last element appear, new elements will start to insert into the container.
function checkDownload(parent, className) {
    var oParent = document.getElementById(parent);
    var aChildren = getByClassName(oParent, className);
    var lastChild = aChildren[aChildren.length - 1];
    //index = aChildren.length;
    var lastChildPosition = lastChild.offsetTop + lastChild.offsetHeight / 2;
    //console.log("Position:" + lastChildPosition);
    var vScreenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var currentPosition = vScreenHeight + scrollTop;
   // console.log("curentPosition:" + position);
    return (lastChildPosition < currentPosition) ? true : false;


}

function waterfall(parent, className) {

    var oParent = document.getElementById(parent);
    var aChildren = getByClassName(oParent, className);
    //console.log("chidren:"+aChildren.length);

    //Get the columns of the container: vColumn=vScreenWidth/vBoxWidth;
    var vScreenWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var vBoxWidth = aChildren[0].offsetWidth;
   // console.log("screen:" + vScreenWidth + "   vBoxWidth:" + vBoxWidth);
    var vColumn = Math.floor(vScreenWidth / vBoxWidth);
    oParent.style.cssText = "width:" + vBoxWidth * vColumn + "px;margin:0 auto";
    //
    var aColumnHeight = [];

    for (var i = 0; i < aChildren.length; i++) {
        if (i < vColumn) {
            aColumnHeight.push(aChildren[i].offsetHeight);
        }
        else {
            var insertPosition = minHeight(aColumnHeight);
           // console.log("index" + insertPosition);
            aChildren[i].style.cssText = "position:absolute;";
            aChildren[i].style.top = aColumnHeight[insertPosition] + "px";
            aChildren[i].style.left = vBoxWidth * insertPosition + "px";
            //console.log("top:" + aChildren[i].style.top);
           // console.log("left:" + aChildren[i].style.left);
            //console.log("height:" + aChildren[i].offsetHeight);
            aColumnHeight[insertPosition] += aChildren[i].offsetHeight;

        }


    }
    // console.log(aColumnHeight);

}
//find index of the column whose height is shortest
function minHeight(heightArray) {
    for (var i in heightArray) {
        if (heightArray[i] == Math.min.apply(null, heightArray))
            return i;
    }
}
//get all the elements by the className
function getByClassName(parent, className) {
    var findItems = [];
    var aChildren = parent.getElementsByTagName('*');
    for (var i = 0; i < aChildren.length; i++) {
        if (aChildren[i].className == className) {
            findItems.push(aChildren[i]);
        }
    }
    return findItems;
}
