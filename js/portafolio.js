import { knowledgeData } from "../data/knowledgeCard.js";
import { projectData } from "../data/projectCards.js";

let d = document;
let bottonHamburger = d.querySelector(".hamburger");
let lateralNavbar = d.querySelector(".lateral-navbar");
let containerTitle = d.querySelector(".container-title");
let titleNeonLight = d.querySelector(".title-neon-light");
let $modal = d.querySelector(".modal");
let $knowledgeCarrousel = d.getElementById("knowledge-carrousel");
let $projectCarrousel = d.querySelector(".work .carrousel-slider");
let $projectCarrouselModal = d.querySelector(
  ".modal-carrousel .carrousel-slider"
);
let section = d.querySelectorAll("section");
let linkA = d.querySelectorAll(".option a");
const MODAL = "modal";
const JOBSECTION = "jobSection";

d.addEventListener("DOMContentLoaded", () => {
  let $languageFragment = d.createDocumentFragment();

  /**Fill languages cards with info from knowledge data */
  knowledgeData.languages.forEach(({ name, src }, i) => {
    let $divCardKnowledge = setKnodledgeCardInfo(name, src, i);
    $languageFragment.appendChild($divCardKnowledge);
  });

  $knowledgeCarrousel.appendChild($languageFragment);

  /**Fill project cards with info from knowledge data */
  let $projectsFragment = d.createDocumentFragment();
  projectData.projects.forEach((project) => {
    let $cardJobDiv = setProjectCardInfo(project, JOBSECTION);
    $projectsFragment.appendChild($cardJobDiv);
  });

  $projectCarrousel.appendChild($projectsFragment);
});

d.addEventListener("click", (e) => {
  /**Open and close lateral navbar with hamburger button */
  if (
    e.target.matches(`.${bottonHamburger.classList.item(0)}`) ||
    e.target.matches(`.${bottonHamburger.classList.item(0)} *`)
  ) {
    if (bottonHamburger.classList.contains("is-active")) {
      bottonHamburger.classList.remove("is-active");
      lateralNavbar.classList.remove("lateral-navbar-open");
      containerTitle.classList.remove("container-title-open");
      titleNeonLight.classList.remove("neon-animation");
    } else {
      bottonHamburger.classList.add("is-active");
      lateralNavbar.classList.add("lateral-navbar-open");
      containerTitle.classList.add("container-title-open");
      titleNeonLight.classList.add("neon-animation");
    }
  }

  /**Fill modal in based of card selected */
  if (e.target.matches(".card")) {
    let languageName = e.target.getAttribute("data-name");
    setInfoToModal(languageName);
    $modal.classList.add("modal-active");
  }

  /**Fill modal in based of card selected when clicked child element */
  if (e.target.parentElement.matches(".card")) {
    let languageName = e.target.parentElement.getAttribute("data-name");
    setInfoToModal(languageName);
    $modal.classList.add("modal-active");
  }

  /**Remove modal */
  if (e.target.matches(".modal-active")) {
    $modal.classList.remove("modal-active");
  }
});

/**Add active class to navbar option in based of scroll position in the page*/
window.onscroll = () => {
  section.forEach((sec) => {
    if (sec.id === "home") {
      return;
    } else {
      let currentScroll = window.scrollY;
      let offset = sec.offsetTop;
      let offsetHeigth = sec.offsetHeight;
      let id = sec.getAttribute("id");
      if (
        currentScroll + 160 >= offset &&
        currentScroll < offset + offsetHeigth
      ) {
        linkA.forEach((link) => {
          link.parentElement.classList.remove("active");
        });
        d.querySelector(
          `.option a[href*=` + id + `]`
        ).parentElement.classList.add("active");
      }
    }
  });
};

/**Add info to modal */
function setInfoToModal(languageName) {
  /**Express JS don´t have logo, so i switched to node */
  if (languageName === "express") {
    languageName = "node";
  }
  let knowledgeInfo = knowledgeData.languages.find(
    (language) => language.name === languageName
  );

  let $projectsFragment = d.createDocumentFragment();
  let projectsInfo = projectData.projects.filter((project) =>
    project.tecnologies.includes(`${languageName}.png`)
  );

  if (projectsInfo.length > 0) {
    projectsInfo.forEach((project) => {
      let $divJobsCard = setProjectCardInfo(project, MODAL);
      $projectsFragment.appendChild($divJobsCard);
    });

    $projectCarrouselModal.innerHTML = "";
    $projectCarrouselModal.appendChild($projectsFragment);
  } else {
    let $h4 = d.createElement("h4");
    $h4.classList.add("not-project", "font-regular");
    $h4.textContent = "Not project yet";
    $projectCarrouselModal.innerHTML = "";
    $projectCarrouselModal.appendChild($h4);
  }

  let name = knowledgeInfo.name.toUpperCase();
  const $modalTitle = d.querySelector(".modal-title h4");
  $modalTitle.textContent = `${name} Experience`;
  const $imgTitle = d.querySelector(".modal-title img");
  $imgTitle.setAttribute("src", knowledgeInfo.src);
  $imgTitle.setAttribute("alt", knowledgeInfo.name);
  const $experienceBars = d.querySelectorAll(".experience-bar");
  $experienceBars.forEach((bar, i) => {
    bar.children[0].className = "";
    bar.children[0].classList.add(knowledgeInfo.experienceCard[i], "fill");
  });
  const $experienceInfoP = d.querySelector(".experience-info p");
  $experienceInfoP.textContent = knowledgeInfo.experienceInfo;
}

/**Add info to knodledgeCard */
function setKnodledgeCardInfo(name, src, i) {
  let $divCardKnowledge = d.createElement("div");
  $divCardKnowledge.setAttribute("data-name", name);
  if (i % 2 > 0) {
    $divCardKnowledge.classList.add("card", "box-shadow", "tooltip");
  } else {
    $divCardKnowledge.classList.add("card", "box-shadow", "tooltip", "white");
  }
  let $imgCardKnowledge = d.createElement("img");
  $imgCardKnowledge.setAttribute("src", src);
  $imgCardKnowledge.setAttribute("alt", name);
  let $h4CardKnowledge = d.createElement("h4");
  $h4CardKnowledge.classList.add("font-bold");
  $h4CardKnowledge.textContent = name;
  let $spanCardKnowledge = d.createElement("span");
  $spanCardKnowledge.classList.add("tooltiptext");
  $spanCardKnowledge.textContent = "Click here for get more info";
  $divCardKnowledge.appendChild($spanCardKnowledge);
  $divCardKnowledge.appendChild($imgCardKnowledge);
  $divCardKnowledge.appendChild($h4CardKnowledge);
  return $divCardKnowledge;
}

/**Add info to project card */
function setProjectCardInfo(project, type) {
  if (type === MODAL) {
    let $cardJobDiv = d.createElement("div");
    $cardJobDiv.classList.add("card-job", "box-shadow");
    let techImg = project.tecnologies.map((technologiesImg) => {
      return `<img src="${project.tecnologiesPath}${technologiesImg}" alt="tech" />`;
    });
    techImg = techImg.join("");
    $cardJobDiv.innerHTML = `
                <div class="bar-detail">-</div>
                <h4 class="font-regular">${project.name}</h4>
                <img class="project"
                  src="${project.img}"
                  alt="${project.name}" />
                <a class="font-regular" rel="noopener noreferrer" target='_blanck' href="${project.url}">
                  Go to
                </a>`;
    return $cardJobDiv;
  } else if (type === JOBSECTION) {
    let $cardJobDiv = d.createElement("div");
    $cardJobDiv.classList.add("card-job", "box-shadow");
    let techImg = project.tecnologies.map((technologiesImg) => {
      return `<img src="${project.tecnologiesPath}${technologiesImg}" alt="tech" />`;
    });
    techImg = techImg.join("");
    $cardJobDiv.innerHTML = `
                  <div class="info">
                    <h4 class="font-regular">Project info</h4>
                    <p class="font-regular">${project.info}</p>
                  </div>
                  <div class="bar-detail">-</div>
                  <h4 class="font-regular">${project.name}</h4>
                  <img
                    class="project"
                    src="${project.img}"
                    alt="${project.name}"
                  />
                  <div class="bar-detail two">-</div>
                  <p class="font-regular">Language and Technology</p>
                  <div class="technology-bar">
                    ${techImg}
                  </div>
                  <a class="font-regular" rel="noopener noreferrer" target='_blanck' href="${project.url}">Go to</a>`;
    return $cardJobDiv;
  }
}
