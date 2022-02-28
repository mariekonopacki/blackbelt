document.onmousemove = function(e) {
    document.body.style.setProperty('--x',(e.clientX)+'px');
    document.body.style.setProperty('--y',(e.clientY)+'px');

}

$("#emailButton").mouseover( function() {
    $('#emailBackground').css('width', '100%');
    // $('#emailBackground').css('box-shadow', '0px 0px 100px 30px rgba(240,78,55, .15)');
    // $('#emailButton').css('transform', 'scale(1.2)');
    // $('.contact-body').css('background-color', 'rgba(0,0,0,.5)');
});


$("#emailButton").mouseout( function() {
    $('#emailBackground').css('width', '0%');
    $('#emailBackground').css('box-shadow', '0px 0px 0px 0px rgba(240,78,55, 0)');
    $('#emailButton').css('transform', 'scale(1)');
    $('.contact-body').css('background-color', 'rgba(0,0,0,0)');
});

function openMenu() {

    // Rotate BB logo, reveal menu
    $('.bb-logo').css('transform', 'rotate(90deg)');
    $('.menu-x').css('display', 'inline-block');
    $('.menu').css('display', 'flex');

    // Disable hover effect temporarily while animation is occuring
    $('.menu-option').each(function() {
        $(this).css('pointer-events', 'none');
    })

    // Menu slides in from left
    $('.menu').delay(10).queue(function (next){
        $('.menu').css('transform', 'translateX(0vw)');
        next();
    });

    // Reinstate hover effect
    $('.menu').delay(500).queue(function (next){
        $('.menu-option').each(function() {
            $(this).css('pointer-events', '');
        })
        next();
    });
};

function closeMenu() {
    $('.menu').css('transform', 'translateX(-100vw)');
    $('.bb-logo').css('transform', 'rotate(0deg)');
    $('.menu-x').css('display', 'none');
    $('.menu').css('display', 'none');
};

function skipTo(sectionNo, pageNo) {

    // Create list of elements to left and right of selected section
    let sections = ['#m1', '#m2', '#m3', '#m4', '#m5', '#m6', '#m7'];
    let right = ['#m1', '#m2', '#m3', '#m4', '#m5', '#m6', '#m7'];
    let left = right.splice(0, right.indexOf(sectionNo) + 1);

    // Change unselected sections to gray
    $.each(sections, function(i, val){
        $(val).css('background-color', 'var(--nearblack)');
        $(val + " span").css('color', 'white');
        $(val).css('pointer-events', 'none')
    })

    // Change selected section color to red
    $(sectionNo).css('background-color', 'var(--red)');

    // Go to the section
    document.getElementById(pageNo).scrollIntoView();

    // Opening effect
    $('.menu').delay(500).queue(function (next){
        // Move left to left
        $.each(left, function(i, val) {
            $(val).css('transform', 'translateX(-100vw)')
        })

        // Move right to right
        $.each(right, function(i, val) {
            $(val).css('transform', 'translateX(100vw)')
        })

        next();
    })

    // Remove X and rotate logo early
    $('.menu-x').css('display', 'none')
    $('.bb-logo').css('transform', 'rotate(0deg)');

    // Close menu and reset positions of sections
    $.each(sections, function(i, val) {
        $(val).delay(1000).queue(function (next) {

            // Reset values
            $(val).css('background-color', '');
            $(val + " span").css('color', '');
            $(val).css('pointer-events', '');
            $(val).css('transform', '');

            // Close menu
            closeMenu();

            next();
        });
    })



};

$(document).on('scroll', function() {

    // If screen is mobile
    var mql = window.matchMedia("screen and (max-width: 768px)")

    // User scrolls back up to 1st page
    if ($(this).scrollTop() <= ($('#p2').position().top) - 400) {
        $('#sidebar').css('left', '-5vw')
        $('#sidebar-text').css('left', '-4vw')
        $('#bb-logo').css('left', '-3.75vw')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');

        if (mql.matches) { // if media query is mobile sized
            $('#sidebar').css('left', '-100vw')
            $('#sidebar-text').css('top', '-20vw')
            $('#bb-logo').css('left', '-20vw')
            $('#sidebar-text').css('left', '30vw')
            $('#hamburger').css('color', 'black');


        }
    }

    // User scrolls to 2nd page
    if ($(this).scrollTop() >= ($('#p2').position().top) - 400) {
        $('#sidebar').css('left', '0px')
        $('#sidebar-text').css('left', '1.25vw')
        $('#sidebar-text').html('Who we are')
        $('#bb-logo').css('left', '1.25vw')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
        $('#hamburger').css('color', 'white');


        if (mql.matches){ // if media query is mobile sized
            $('#sidebar').css('left', '0px')
            $('#sidebar-text').css('top', '10px')
            $('#sidebar-text').css('left', '30vw')
            $('#sidebar-text').html('Who we are')
            $('#bb-logo').css('left', '3vw')
        }
    }

    // User scrolls to 3rd page
    if ($(this).scrollTop() >= ($('#p3').position().top) - 400) {
        $('#sidebar-text').html('Clients')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');

        // // If user is within animation zone
        // if ($(this).scrollTop() <= ($('#p3').position().top) - 100) {
        //
        //     // Select all columns, scale
        //     let allCols = document.querySelectorAll(".col");
        //     for (let i = 0; i < allCols.length; i++) {
        //         allCols[i].style.transform = "scale(" + cardZoomScale($(this).scrollTop()) + ")"
        //     }
        // }
    }

    // User scrolls to 4th page
    if ($(this).scrollTop() >= ($('#p4').position().top) - 400) {
        $('#sidebar-text').html('Testimonial');
        $('#sidebar-text').css('color', 'white')
        $('.bb-1').css('fill', 'white');
        $('.bb-2').css('fill', 'white');
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
    }


    function cardZoomScale (yPos) {
        return (yPos - (($('#p3').position().top) - 400)) * (1 - .1) / ((($('#p3').position().top) - 100) - (($('#p3').position().top) - 400)) + .1;
    }

    // User scrolls to 5th page
    if ($(this).scrollTop() >= ($('#p4').position().top) + $('#p4').outerHeight(true) - 400) {
        $('#sidebar-text').html('Process');
        $('#sidebar-text').css('color', 'var(--activeProcessB');
        $('.bb-1').css('fill', 'var(--activeProcessB');
        $('.bb-2').css('fill', 'var(--activeProcessB');
        $('#sidebar').css('background-color', 'var(--sidebar)');
        $('#sidebar').css('border-right', '1px solid var(--activeProcessB');
    }

    //
    // // User scrolls to 6th page
    // if ($(this).scrollTop() >= ($('#p6').position().top) - 400) {
    //     $('#sidebar-text').html('Capabilities');
    //     $('#sidebar-text').css('color', 'var(--activeProcessB');
    //     $('.bb-1').css('fill', 'var(--activeProcessB');
    //     $('.bb-2').css('fill', 'var(--activeProcessB');
    //     $('#sidebar').css('background-color', 'var(--sidebar)');
    //     $('#sidebar').css('border-right', '1px solid var(--activeProcessB');
    // }

    // User scrolls to 7th page
    if ($(this).scrollTop() >= ($('#p7').position().top) - 400) {
        $('#sidebar-text').html('Contact Us');
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
    }


})

function expand(row, col) {

    // If screen is mobile
    let desktop = window.matchMedia("screen and (min-width: 768px)")

    // Find selected box
    let selectedBox = document.querySelector("#" + row + "> ." + col)

    document.getElementById('grid').scrollIntoView({behavior: 'smooth'});

    // If box is already selected, then close all boxes. If not, then open that box
    if (selectedBox.classList.contains('selected')) {
        // Reset all columns + brighten
        let allCols = document.querySelectorAll(".col");
        for (let i = 0; i < allCols.length; i++) {
            // If desktop, reset flex
            if (desktop.matches) {
                allCols[i].style.flex = "1 1 0%";
            // If mobile, reset height
            } else {
                allCols[i].style.height = "16.66vh";
            }

            allCols[i].style.backgroundColor = null;
            // allCols[i].querySelector('svg').style.transform = null;
            allCols[i].classList.remove("selected");
        }

        // Reset all rows
        let allRows = document.querySelectorAll(".row");
        for (let i = 0; i < allRows.length; i++) {
            allRows[i].style.flex = 1;
        }

    } else {

        // Reset all columns + darken
        let allCols = document.querySelectorAll(".col");
        for (let i = 0; i < allCols.length; i++) {
            // If desktop, reset flex
            if (desktop.matches) {
                allCols[i].style.flex = "1 1 0%";
                // If mobile, reset height
            } else {
                allCols[i].style.height = "16.66vh";
            }

            allCols[i].style.backgroundColor = '#ababab';
            allCols[i].classList.remove("selected");
            // allCols[i].querySelector('svg').style.transform = "scale(.5)";
        }

        // Reset all rows
        let allRows = document.querySelectorAll(".row");
        for (let i = 0; i < allRows.length; i++) {
            allRows[i].style.flex = 1;
        }

        // If desktop
        if (desktop.matches) {
            // Expand clicked row
            document.getElementById(row).style.height = '5';

            // Expand clicked column

            if (col == 'col1and2' ) {
                let cols = document.querySelectorAll(".col1, .col2, .col1and2")
                for (let i = 0; i < cols.length; i++) {
                    cols[i].style.flex = '2';
                }
            } else if (col == 'col3and4') {
                let cols = document.querySelectorAll(".col3, .col4, .col3and4")
                for (let i = 0; i < cols.length; i++) {
                    cols[i].style.flex = '2';
                }
            } else {
                let cols;
                if (col == 'col1' || col == 'col2') {
                    document.querySelectorAll(".col1and2")[0].style.flex = '2.5';
                } else if (col == 'col3' || col == 'col4') {
                    document.querySelectorAll(".col3and4")[0].style.flex = '2.5';
                }
                cols = document.querySelectorAll("." + col);
                for (let i = 0; i < cols.length; i++) {
                    cols[i].style.flex = '4';
                }
            }
        } else {
            selectedBox.style.height = '80vh';
        }



        // Brighten expanded box and add class tag
        selectedBox.style.backgroundColor = null;
        // selectedBox.querySelector('svg').style.transform = null;
        selectedBox.classList.add("selected");
    }

}


function processStep(step) {

    // If button is already selected, close all tabs
    if ($('.' + step).hasClass("button-selected")) {
        // Clear selected class from any step
        let allSteps = document.querySelectorAll(".process-button");
        for (let i = 0; i < allSteps.length; i++) {
            allSteps[i].classList.remove("button-selected");
        }

        // Reset heights of rows
        $('.process-row-2').css('height', (80 / 3 * 2) + "vh");
        $('.process-row-3').css('height', '0vh');

        // Reset sidebar color
        $('#sidebar').css('background-color', 'var(--red)');


        // Make text disappear
        $('.selected-tab-text').css('opacity', '0%');

        // Reset colors
        document.documentElement.style.setProperty('--sidebar', '#F04E37');
        document.documentElement.style.setProperty('--activeProcess', '#2f2f2f');
        document.documentElement.style.setProperty('--activeProcessB', '#FFFFFF');


    } else {

        // Clear selected class from any step
        let allSteps = document.querySelectorAll(".process-button");
        for (let i = 0; i < allSteps.length; i++) {
            allSteps[i].classList.remove("button-selected");
        }

        // Add selected class to clicked on step
        document.querySelector("." + step).classList.add("button-selected")

        // Reduce height of other buttons
        $('.process-row-2').css('height', (80 / 5) + "vh");

        // Expand height of text row
        $('.process-row-3').css('height', (80 / 2.15) + "vh");

        // Make sidebar change color
        $('#sidebar').css('background-color', 'var(--activeProcess)');

        if (step == 'data') {
            $('.selected-tab-text').html("Starting with data, we use machine learning to recognize patterns, and provide insights that accelerate learning, build efficiencies, and inform the work.")
            document.documentElement.style.setProperty('--sidebar', '#3734D3');
            document.documentElement.style.setProperty('--activeProcess', '#3734D3');
            document.documentElement.style.setProperty('--activeProcessB', '#FFD3AA');

        } else if (step == 'strategy') {
            $('.selected-tab-text').html("We develop a strategic foundation that guides every part of the process from concept to execution.")

            document.documentElement.style.setProperty('--sidebar', '#EDFFBB');
            document.documentElement.style.setProperty('--activeProcess', '#EDFFBB');
            document.documentElement.style.setProperty('--activeProcessB', '#AE00BD');

        } else if (step == 'design') {
            $('.selected-tab-text').html("We design smart brand experiences that thrive in an ever-changing multimedia environment from UX to XR")

            document.documentElement.style.setProperty('--sidebar', '#EC453A');
            document.documentElement.style.setProperty('--activeProcess', '#EC453A');
            document.documentElement.style.setProperty('--activeProcessB', '#FFF492');

        } else if (step == 'technology') {
            $('.selected-tab-text').html("We build robust technologies that serve as the backbone of companies and our industry.")

            document.documentElement.style.setProperty('--sidebar', '#480C95');
            document.documentElement.style.setProperty('--activeProcess', '#480C95');
            document.documentElement.style.setProperty('--activeProcessB', '#9AFF81');

        }

        // Make text appear
        $('.selected-tab-text').css('opacity', '100%');
    }
}

function capabilityStep(step) {
    // If button is already selected, close all tabs
    if ($('.' + step).hasClass("selectedC")) {
        // Clear selected class from any step
        let allSteps = document.querySelectorAll(".capability");
        for (let i = 0; i < allSteps.length; i++) {
            allSteps[i].classList.remove("selectedC");
        }

        // Reset sidebar color
        $('#sidebar').css('background-color', 'var(--red)');

        // Make text disappear
        $('.selected-tab-text').css('opacity', '0%');

        // Reset colors
        document.documentElement.style.setProperty('--sidebar', '#F04E37');
        document.documentElement.style.setProperty('--activeProcess', '#2f2f2f');
        document.documentElement.style.setProperty('--activeProcessB', '#FFFFFF');
    } else {
        // Clear selected class from any step
        let allSteps = document.querySelectorAll(".capability");
        for (let i = 0; i < allSteps.length; i++) {
            allSteps[i].classList.remove("selectedC");
        }

        // Add selected class to clicked on step
        document.querySelector("." + step).classList.add("selectedC")


    }
}

var textWrapper = document.querySelector('.changing-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper = document.querySelector('.changing-text2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter2'>$&</span>");


var textWrapper = document.querySelector('.changing-text3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter3'>$&</span>");

var textWrapper = document.querySelector('.changing-text4');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter4'>$&</span>");

var textWrapper = document.querySelector('.changing-text5');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter5'>$&</span>");


anime.timeline({loop: true})
    .add({
        targets: '.letter',
        translateY: [20,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    }).add({
        targets: '.letter',
        translateY: [0,-10],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) =>  30 * i
    }).add({
        targets: '.letter2',
        translateY: [20,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    }).add({
        targets: '.letter2',
        translateY: [0,-10],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) =>  30 * i
    }).add({
        targets: '.letter3',
        translateY: [20,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    }).add({
        targets: '.letter3',
        translateY: [0,-10],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) => 30 * i
    }).add({
        targets: '.letter4',
        translateY: [20,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    }).add({
        targets: '.letter4',
        translateY: [0,-10],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) => 30 * i
    }).add({
        targets: '.letter5',
        translateY: [20,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
    }).add({
        targets: '.letter5',
        translateY: [0,-10],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) => 30 * i
    })

;


// If on desktop,
var min = window.matchMedia("screen and (min-width: 768px)")

if (min.matches) {
    var controller = new ScrollMagic.Controller();

    var horizontalSlide = new TimelineMax()
        // animate panels
        .fromTo("#slide-container", 1, {x: "0%"},  {x: "-45%", immediateRender: false})


    // create scene to pin and link animation
    new ScrollMagic.Scene({
        triggerElement: "#p5-p6-wrapper",
        triggerHook: "onLeave",
        offset: 200,
        duration: "200%"
    })
        .setPin("#p5-p6-wrapper")
        .setTween(horizontalSlide)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);



    // Client tiles appear upon scrolling
    var staggerScene = new TimelineMax();

    staggerScene.staggerFromTo(".col2", 1, {y: 500}, {y: 0}, 0.3, 0);
    staggerScene.staggerFromTo(".col4", 1, {y: 500}, {y: 0}, 0.3, .2);
    staggerScene.staggerFromTo(".col3", 1, {y: 500}, {y: 0}, 0.5, .7);
    staggerScene.staggerFromTo(".col1", 1, {y: 500}, {y: 0}, 0.7, 1);


    new ScrollMagic.Scene({
        triggerElement: "#p3",
        offset: 0,
        duration: "70%",
        triggerHook: .8,
    })
        .setTween(staggerScene)
        .addTo(controller);

}

