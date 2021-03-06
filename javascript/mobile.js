//Note: JS Media Queries awesome reference: http://www.sitepoint.com/javascript-media-queries/
//Note: matchMediaObject.matches returns a true or false depending on query result 


//*******  Media Queries from top of view.js  *******//

// var mqTab = window.matchMedia("(max-width: 1000px)");
// var mqPhone = window.matchMedia("screen and (min-width: 200px) and (max-width: 750px)");
// var mqPhoneWide = window.matchMedia("screen and (min-width: 300px) and (max-width: 748px) and (orientation: landscape)");

//********  Drawer  *********/

var browserWidth = $(document).width();
var drawerIsOpen = false;

//drawer example at: http://www.savthecoder.com/blog/drawer-ui-jquery

function openDrawer() {
    $(".status.frame").animate({
        left: 0
    }, 500/*, function() {
        $("div.select").hide();
    }*/); //this causes more problems than it solves.  must find another solution to the excessive scrollspace problem
    drawerIsOpen = true;
}

function closeDrawer() {
    $("div.select").show();
    $(".status.frame").animate({
        left: -browserWidth
    }, 500);
    drawerIsOpen = false;
}

function toggleDrawer() {
    if (drawerIsOpen) {
        closeDrawer();
    } else {
        openDrawer();
    }
}

//******** Mobile specific handlers ********//

$(window).ready(resizeHandler).resize(resizeHandler);
$(".thing").on("click", mobileSelectButtonHandler); //buttons should have 2 select handlers now

//changes layout depending on how big the viewport is
//runs on page load, and whenever the window resizes
function resizeHandler() {
    browserWidth = $(document).width();
    //console.log(browserWidth);

    //if this is a tablet width or smaller
    if (mqTab.matches) {
        thingView.convertLayoutToTablet();

        //removes old mobile handlers and adds new one
        $('.thing').unbind("click", mobileSelectButtonHandler);
        $('.thing').click(mobileSelectButtonHandler);
    } else {
        thingView.convertLayoutFromTablet();
        $(".thing").unbind("click", mobileSelectButtonHandler);
    }

    //if this is a phone landscape layout...
    if (mqPhoneWide.matches) {
        thingView.convertLayoutToWidePhone();
    } else {
        thingView.convertLayoutFromWidePhone();
    }
}

//adds drawer listener if this is a tablet viewport size or smaller
function mobileSelectButtonHandler() {
    if (mqTab.matches) {
        toggleDrawer(); 

        //re-adding handler because, if this thing was just selected, 
        //the back button was re-written during thingView.printThing,
        //and wont have a handler
        $("#closeDrawer").unbind("click", toggleDrawer); //removes all click listeners if there is already are some
        $("#closeDrawer").on("click", toggleDrawer);
    }
}





