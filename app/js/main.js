//инициализация MFP popup для форм
$(document).on("click", ".mfp-link", function () {
  var a = $(this);
  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 610,
    mainClass: "my-mfp-zoom-in",
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $(".mfp-wrap, .mfp-bg").addClass("delay-back");
          $(".mfp-popup").addClass("delay-back");
        }, 700);
      },
    },
  });
  return false;
});

// Validation

jQuery.validator.addMethod(
  "lettersonly",
  function (value, element) {
    return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
  },
  "Incorrect format"
);

jQuery.validator.addMethod(
  "telephone",
  function (value, element) {
    return (
      this.optional(element) ||
      /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value)
    );
  },
  "Incorrect format"
);


const tabsBtn  = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });

            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}
document.querySelector('.tabs__nav-btn').click();




// TAB-CHANGES
const tabBtn = document.querySelectorAll('.main-category-item')
const tabTitle = document.querySelector('.main-content-title')

tabBtn.forEach(function(e){
  e.addEventListener('click' , function(){
    tabTitle.innerHTML = e.innerText;
  })
})

// BTN(+, -) - СCOUNTER

// let btnMinus = document.querySelector('.main-content-wrap-btnminus')
// let btnPlus = document.querySelector('.main-content-wrap-btnplus')
// let btnSumm = document.querySelector('.main-content-wrap-btnsumm')
let itemFoods = document.querySelectorAll('.main-content-wrap')
let btnResult = document.querySelector('.main-content-cart-input')


itemFoods.forEach(function(item) {
 let btnPlus = item.querySelector('.main-content-wrap-btnplus');
 let btnMinus = item.querySelector('.main-content-wrap-btnminus');
 let btnSumm = item.querySelector('.main-content-wrap-btnsumm')
 let number = 1;



 btnPlus.addEventListener('click', function() {
  if (number < 100) {
    number++
  }
  btnSumm.innerHTML = number;
  btnResult.innerHTML === number.summ;
 })

 btnMinus.addEventListener('click', function() {
  if (number > 1) {
    number--
  }
  if (number <= 0) {
    delete itemFoods;
  }
  btnSumm.innerHTML = number;
 })


})


// POPUP
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function(e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup'));
    })
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
  }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function(e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});


// Change radio btn POPUP-FORM

document.querySelector('.radio-1-hidden').addEventListener('click', function() {
    document.querySelector('.popup-form-container').classList.add('hidden');
    document.querySelector('.popup-form-input-hidden').classList.add('hidden');
    if (document.querySelector('.radio-2-default').target) {
    document.querySelector('.popup-form-container').classList.remove('hidden');
    document.querySelector('.popup-form-input-hidden').classList.remove('hidden');
    }
})