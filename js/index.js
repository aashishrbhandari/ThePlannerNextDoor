/*** Comments:  */
function thisFilePath() {
    let currhref = window.location.href;
    let filePath = currhref.substring(0, currhref.lastIndexOf("/"));
    //return filePath;
    return "";
}

const thisLoc = thisFilePath();

// Get Navbar
async function loadNavbar() {
    document.querySelector(".navbar-component").innerHTML = await (await fetch(thisLoc + '/navbar.html')).text();
    setActiveLink();
}

// Get Footer
async function loadFooter() {
    document.querySelector(".footer-component").innerHTML = await (await fetch(thisLoc + '/footer.html')).text();
    setMyEvent();
}

function checkColor(colorName) {

    if (!colorName.startsWith("#")) {
        colorName = "#" + colorName;
    }

    if (/^#([0-9A-F]{3}){1,2}$/i.test(colorName)) {
        return colorName;
    } else {
        return "ERROR";
    }

}

function checkFont(fontName) {
    return fontName;
}

function setMyEvent() {

    let chooserShower = document.querySelector("button.chooser-shower");
    let chooser = document.querySelector("font-checker");
    let changeFont = document.querySelector(".change-font");
    let changeFontDefault = document.querySelector(".change-font-default");
    let fontStyleElement = document.querySelector(".font-styler");
    let root = document.documentElement;


    chooserShower.addEventListener('click', function () {
        let chooserList = chooser.classList;
        if (chooserList.contains("active")) {
            chooserList.remove("active");
            this.textContent = "Show";
        } else {
            chooserList.add("active");
            this.textContent = "Hide";
        }
    });
    changeFont.addEventListener('click', function () {

        let fontText = document.querySelector("#font-text");
        let colorText = document.querySelector("#color-text");

        selectedFont = fontText.value.replaceAll(" ", "+"); // No Escape Vul to Injection
        selectedColor = colorText.value;  // No Escape Vul to Injection

        selectedColor = checkColor(selectedColor);

        console.log("selectedFont: ", selectedFont);
        console.log("selectedColor: ", selectedColor);

        fontStyleElement.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=${selectedFont}&display=swap'); 
                body {font-family: ${selectedFont.replaceAll("+", " ")}, 'STIX Two Text', sans-serif;}
            </style>`;
        if (selectedColor === "ERROR") {
            // Do Not Do Anything
            return;
        } else {
            root.style.setProperty('--space-blue', selectedColor);
        }
    });

    changeFontDefault.addEventListener('click', function () {
        fontStyleElement.innerHTML = ``;
        root.style.setProperty('--space-blue', '#1E2952');
    });
}

function setActiveLink() {
    console.log("window.location.href => ", window.location.href);
    let thisResFile = window.location.pathname.split("/").pop().split("#")[0].trim();

    let navLinks = document.querySelectorAll("nav .navbar-nav .nav-link");

    for (oneNavLink of navLinks) {

        let currResFile = oneNavLink.href.split("/").pop().trim();

        if (thisResFile === "" && (oneNavLink.href === "#" || currResFile === "index.html")) {
            oneNavLink.classList.add("active");
            break;
        }

        if (thisResFile === currResFile) {
            oneNavLink.classList.add("active");
            break;
        }

    }
}

/*** Load Navbar & Footer */
loadNavbar();
loadFooter();
/*** Load Navbar & Footer ENDS */


/*** Image Slider [For Desktop] */

const slider = document.querySelector('.img-slider-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
});

/*** Image Slider [For Desktop] ENDS */

