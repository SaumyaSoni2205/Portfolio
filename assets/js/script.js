'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('services.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(services => {
          const serviceList = document.getElementById("service-list");

          services.forEach(service => {
              const listItem = document.createElement("li");
              listItem.classList.add("service-item");

              listItem.innerHTML = `
                  <div class="service-icon-box">
                      <img src="${service.icon}" alt="${service.title} icon" width="40">
                  </div>
                  <div class="service-content-box">
                      <h4 class="h4 service-item-title">${service.title}</h4>
                      <p class="service-item-text">${service.description}</p>
                  </div>
              `;

              serviceList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayEducation(data) {
    const educationList = document.getElementById('education-list');

    data.education.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'timeline-item';
        listItem.innerHTML = `
            <h4 class="h4 timeline-item-title">${item.degree} at ${item.institution}</h4>
            <span>${item.duration}${item.percentage ? ', ' + item.percentage : ''}</span>
        `;
        educationList.appendChild(listItem);
    });
}

function displayExperience(data) {
    const experienceList = document.getElementById('experience-list');

    data.experience.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'timeline-item';
        listItem.innerHTML = `
            <h4 class="h4 timeline-item-title">${item.position} at ${item.company}</h4>
            <span>${item.duration}, ${item.location}</span>
            <p class="timeline-text">Responsibilities: ${item.responsibilities.join(', ')}</p>
        `;
        experienceList.appendChild(listItem);
    });
}

function displaySkills(data) {
    const skillsList = document.getElementById('skills-list');

    data.skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.className = 'skills-item';
        listItem.innerHTML = `
            <div class="title-wrapper">
                <h5 class="h5">${skill.title}</h5>
                <span class="skill-level">${skill.level}</span>
            </div>
        `;
        skillsList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const educationData = await fetchData('education.json');
        displayEducation(educationData);

        const experienceData = await fetchData('experience.json');
        displayExperience(experienceData);

        const skillsData = await fetchData('skills.json');
        displaySkills(skillsData);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

