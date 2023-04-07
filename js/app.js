// Select the navbar list element
const navbarList = document.querySelector('.navbar__menu ul');

// Select all the section elements in the document
const sections = document.querySelectorAll('section');

// Create a document fragment to hold the list items
const listFragment = document.createDocumentFragment();

// Loop through each section and create a new list item element for each one
for (let i = 0; i < sections.length; i++) {
  // Create a new list item element
  const listItem = document.createElement('li');

  // Get the section ID and data-nav value
  const sectionId = sections[i].id;
  const sectionTitle = sections[i].getAttribute('data-nav');

  // Set the inner HTML of the list item to be a link with the section title
  listItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionTitle}</a>`;

  // Add an event listener to the link that corresponds to the section
  const link = listItem.querySelector('a');
  link.addEventListener('click', function(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Remove the "active" class from all links
    const links = document.querySelectorAll('.navbar__menu .menu__link');
    links.forEach((link) => {
      link.classList.remove('active');
    });

    // Add the "active" class to the clicked link
    link.classList.add('active');

    // Scroll to the corresponding section
    const section = document.querySelector(event.target.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });

  // Add the list item to the document fragment
  listFragment.appendChild(listItem);
}

// Add the list items to the navbar list
navbarList.appendChild(listFragment);

// Set the first section to be active by default
sections[0].classList.add('your-active-class');
let timerId;
// Add an event listener to the window object to detect scrolling
window.addEventListener('scroll', function() {
  // If the timer is set, clear it
  if (timerId) {
    clearTimeout(timerId);
  }

  // Get the currently active section
  let activeSection = null;
  sections.forEach((section) => {
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.top <= window.innerHeight / 2 && sectionRect.bottom >= window.innerHeight / 2) {
      activeSection = section;
    }
  });

  // Remove the "active" class from all links
  const links = document.querySelectorAll('.navbar__menu .menu__link');
  links.forEach((link) => {
    link.classList.remove('active');
  });

  // Add the "active" class to the link that corresponds to the active section
  const activeLink = document.querySelector(`.navbar__menu .menu__link[href="#${activeSection.id}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Hide the navbar by adding a class to it
  const navbar = document.querySelector('.navbar__menu');
  navbar.classList.add('hide');

  // Set a new timer to show the navbar after a delay
  timerId = setTimeout(function() {
    navbar.classList.remove('hide');
  }, 13);
});
