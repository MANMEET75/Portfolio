/**
* Template Name: Personal - v4.9.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

;


anime.timeline({loop: true})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// adding autotyping to the UI over here
let typed = new Typed(".auto-input", {
  strings: ["Manmeet Singh", "Aspiring Data Scientist","AI Enthusiast","Python Lover ❤","Innovative","Creative","Fast Learner","Self Motivated"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true
})



// dealing with data scientist heading

let dsHeading=document.getElementById("dsHeading");
setTimeout(() => {
  dsHeading.style.color="#541212";
  dsHeading.style.borderBottomColor="white";
  
}, 2000);
setTimeout(() => {
  dsHeading.style.color="#8B9A46";
  dsHeading.style.borderBottomColor="white";
  dsHeading.style.fontWeight=bold;
  
}, 3000);





// adding zooming effect to the box present in the services
let box1=document.getElementById("box1");
box1.addEventListener("mouseover",function (event) {
  box1.classList.add("zoom");
  setTimeout(() => {
      box1.classList.remove("zoom");

    }, 4000);

  
}) 
  
let box2=document.getElementById("box2");
box2.addEventListener("mouseover",function (event) {
  box2.classList.add("zoom");
  setTimeout(() => {
    box2.classList.remove("zoom");

    }, 4000);

  
}) 
  
let box3=document.getElementById("box3");
box3.addEventListener("mouseover",function (event) {
  box3.classList.add("zoom");
  setTimeout(() => {
    box3.classList.remove("zoom");

    }, 4000);

  
}) 

let box4=document.getElementById("box4");
box4.addEventListener("mouseover",function (event) {
  box4.classList.add("zoom");
  setTimeout(() => {
    box4.classList.remove("zoom");

    }, 4000);

  
}) 
let box5=document.getElementById("box5");
box5.addEventListener("mouseover",function (event) {
  box5.classList.add("zoom");
  setTimeout(() => {
    box5.classList.remove("zoom");

    }, 4000);

  
}) 


let box6=document.getElementById("box6");
box6.addEventListener("mouseover",function (event) {
  box6.classList.add("zoom");
  setTimeout(() => {
    box6.classList.remove("zoom");

    }, 4000);

  
}) 
let box7=document.getElementById("box7");
box7.addEventListener("mouseover",function (event) {
  box7.classList.add("zoom");
  setTimeout(() => {
    box7.classList.remove("zoom");

    }, 4000);

  
}) 
let box8=document.getElementById("box8");
box8.addEventListener("mouseover",function (event) {
  box8.classList.add("zoom");
  setTimeout(() => {
    box8.classList.remove("zoom");

    }, 4000);

  
}) 
let box9=document.getElementById("box9");
box9.addEventListener("mouseover",function (event) {
  box9.classList.add("zoom");
  setTimeout(() => {
    box9.classList.remove("zoom");

    }, 4000);

  
}) 

function boxHandler(event) {
  
     box1.classList.add("zoom");
      setTimeout(() => {
          box1.classList.remove("zoom");
    
        }, 4000);
    
    
    }


/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()




let card1=document.getElementById("card1");
card1.addEventListener("mousemove",function (event) {
  card1.classList.add("pressed");
  setTimeout(() => {
    card1.classList.remove("pressed");

    }, 1700);

  
}) 


let card2=document.getElementById("card2");
card2.addEventListener("mousemove",function (event) {
  card2.classList.add("pressed");
  setTimeout(() => {
    card2.classList.remove("pressed");

    }, 1700);

  
}) 


let card3=document.getElementById("card3");
card3.addEventListener("mousemove",function (event) {
  card3.classList.add("pressed");
  setTimeout(() => {
    card3.classList.remove("pressed");

    }, 1700);

  
}) 


let card4=document.getElementById("card4");
card4.addEventListener("mousemove",function (event) {
  card4.classList.add("pressed");
  setTimeout(() => {
    card4.classList.remove("pressed");

    }, 1700);

  
}) 


let card5=document.getElementById("card5");
card5.addEventListener("mousemove",function (event) {
  card5.classList.add("pressed");
  setTimeout(() => {
    card5.classList.remove("pressed");

    }, 1700);

  
}) 


let card6=document.getElementById("card6");
card6.addEventListener("mousemove",function (event) {
  card6.classList.add("pressed");
  setTimeout(() => {
    card6.classList.remove("pressed");

    }, 1700);

  
}) 


let card7=document.getElementById("card7");
card7.addEventListener("mousemove",function (event) {
  card7.classList.add("pressed");
  setTimeout(() => {
    card7.classList.remove("pressed");

    }, 1700);

  
}) 
let card8=document.getElementById("card8");
card8.addEventListener("mousemove",function (event) {
  card8.classList.add("pressed");
  setTimeout(() => {
    card8.classList.remove("pressed");

    }, 1700);

  
}) 



let card9=document.getElementById("card9");
card9.addEventListener("mousemove",function (event) {
  card9.classList.add("pressed");
  setTimeout(() => {
    card9.classList.remove("pressed");

    }, 1700);

  
}) 

let card10=document.getElementById("card10");
card10.addEventListener("mousemove",function (event) {
  card10.classList.add("pressed");
  setTimeout(() => {
    card10.classList.remove("pressed");

    }, 1700);

  
}) 

let card11=document.getElementById("card11");
card11.addEventListener("mousemove",function (event) {
  card11.classList.add("pressed");
  setTimeout(() => {
    card11.classList.remove("pressed");

    }, 1700);

  
}) 

let card12=document.getElementById("card12");
card12.addEventListener("mousemove",function (event) {
  card12.classList.add("pressed");
  setTimeout(() => {
    card12.classList.remove("pressed");

    }, 1700);

  
}) 
let card13=document.getElementById("card13");
card13.addEventListener("mousemove",function (event) {
  card13.classList.add("pressed");
  setTimeout(() => {
    card13.classList.remove("pressed");

    }, 1700);

  
}) 
let card14=document.getElementById("card14");
card14.addEventListener("mousemove",function (event) {
  card14.classList.add("pressed");
  setTimeout(() => {
    card14.classList.remove("pressed");

    }, 1700);

  
}) 





  


