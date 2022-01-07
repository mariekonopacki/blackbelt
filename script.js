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


    // User scrolls back up to 1st page
    if ($(this).scrollTop() <= ($('#p2').position().top) - 400) {
        $('#sidebar').css('left', '-5vw')
        $('#sidebar-text').css('left', '-4vw')
        $('#bb-logo').css('left', '-3.75vw')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
    }

    // User scrolls to 2nd page
    if ($(this).scrollTop() >= ($('#p2').position().top) - 400) {
        $('#sidebar').css('left', '0px')
        $('#sidebar-text').css('left', '1.25vw')
        $('#sidebar-text').html('Who we are')
        $('#bb-logo').css('left', '1.25vw')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
    }

    // User scrolls to 3rd page
    if ($(this).scrollTop() >= ($('#p3').position().top) - 400) {
        $('#sidebar-text').html('Clients')
        $('#sidebar').css('background-color', 'var(--red)');
        $('#sidebar').css('border-right', 'none');
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

    // User scrolls to 5th page
    if ($(this).scrollTop() >= ($('#p5').position().top) - 400) {
        $('#sidebar-text').html('Process');
        $('#sidebar-text').css('color', 'var(--activeProcessB');
        $('.bb-1').css('fill', 'var(--activeProcessB');
        $('.bb-2').css('fill', 'var(--activeProcessB');
        $('#sidebar').css('background-color', 'var(--sidebar)');
        $('#sidebar').css('border-right', '1px solid var(--activeProcessB');
    }

    // User scrolls to 6th page
    if ($(this).scrollTop() >= ($('#p6').position().top) - 400) {
        $('#sidebar-text').html('Capabilities');
        $('#sidebar-text').css('color', 'var(--activeProcessB');
        $('.bb-1').css('fill', 'var(--activeProcessB');
        $('.bb-2').css('fill', 'var(--activeProcessB');
        $('#sidebar').css('background-color', 'var(--sidebar)');
        $('#sidebar').css('border-right', '1px solid var(--activeProcessB');
    }


})

function expand(row, col) {

    let selectedBox = document.querySelector("#" + row + "> ." + col)

    document.getElementById('grid').scrollIntoView({behavior: 'smooth'});


    // If box is already selected, then close all boxes. If not, then open that box
    if (selectedBox.classList.contains('selected')) {

        // Reset all columns + brighten
        let allCols = document.querySelectorAll(".col");
        for (let i = 0; i < allCols.length; i++) {
            allCols[i].style.flex = 1;
            allCols[i].style.filter = 'brightness(100%)';
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
            allCols[i].style.flex = 1;
            allCols[i].style.filter = 'brightness(40%)';
            allCols[i].classList.remove("selected");
        }

        // Reset all rows
        let allRows = document.querySelectorAll(".row");
        for (let i = 0; i < allRows.length; i++) {
            allRows[i].style.flex = 1;
        }

        // Expand clicked row
        document.getElementById(row).style.flex = '4';

        // Expand clicked column
        let cols = document.querySelectorAll("." + col);
        for (let i = 0; i < cols.length; i++) {
            cols[i].style.flex = 4;
        }

        // Brighten expanded box and add class tag
        selectedBox.style.filter = 'brightness(100%)';
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
        $('.process-row-2').css('height', '600px');
        $('.process-row-3').css('height', '0');

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
        $('.process-row-2').css('height', '200px');

        // Expand height of text row
        $('.process-row-3').css('height', '400px');

        // Make sidebar change color
        $('#sidebar').css('background-color', 'var(--activeProcess)');

        // Make text appear
        $('.selected-tab-text').css('opacity', '100%');

        if (step == 'data') {
            document.documentElement.style.setProperty('--sidebar', '#3734D3');
            document.documentElement.style.setProperty('--activeProcess', '#3734D3');
            document.documentElement.style.setProperty('--activeProcessB', '#FFD3AA');

        } else if (step == 'strategy') {
            document.documentElement.style.setProperty('--sidebar', '#EDFFBB');
            document.documentElement.style.setProperty('--activeProcess', '#EDFFBB');
            document.documentElement.style.setProperty('--activeProcessB', '#AE00BD');

        } else if (step == 'design') {
            document.documentElement.style.setProperty('--sidebar', '#EC453A');
            document.documentElement.style.setProperty('--activeProcess', '#EC453A');
            document.documentElement.style.setProperty('--activeProcessB', '#FFF492');

        } else if (step == 'technology') {
            document.documentElement.style.setProperty('--sidebar', '#480C95');
            document.documentElement.style.setProperty('--activeProcess', '#480C95');
            document.documentElement.style.setProperty('--activeProcessB', '#9AFF81');

        }
    }


}



var textWrapper = document.querySelector('.changing-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper = document.querySelector('.changing-text2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter2'>$&</span>");


anime.timeline({loop: true})
    .add({
        targets: '.letter',
        rotateY: [-90, 0],
        duration: 1300,
        delay: (el, i) => 45 * i
    })
    .add({
        targets: '.changing-text',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    })
    .add({
        targets: '.letter2',
        rotateY: [-90, 0],
        duration: 1300,
        delay: (el, i) => 45 * i
    })
    .add({
        targets: '.changing-text2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    })


