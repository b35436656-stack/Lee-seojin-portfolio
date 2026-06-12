const toggle = document.querySelector("[data-menu-toggle]");
const links = document.querySelector("[data-nav-links]");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactButton = document.querySelector("[data-contact-toggle]");
const contactPanel = document.querySelector("[data-contact-panel]");

const decodeParts = (parts) => parts.map((part) => String.fromCharCode(part)).join("");

const contact = {
  email: decodeParts([97,108,114,110,100,49,52,53,49,64,103,109,97,105,108,46,99,111,109]),
  phone: decodeParts([48,49,48,45,51,52,54,50,45,52,48,50,54])
};

if (contactButton && contactPanel) {
  contactButton.addEventListener("click", () => {
    const isOpen = contactPanel.classList.toggle("is-open");
    contactButton.setAttribute("aria-expanded", String(isOpen));
    if (isOpen && !contactPanel.dataset.loaded) {
      contactPanel.querySelector("[data-email]").textContent = contact.email;
      contactPanel.querySelector("[data-phone]").textContent = contact.phone;
      contactPanel.querySelector("[data-mail-link]").setAttribute("href", `mailto:${contact.email}`);
      contactPanel.querySelector("[data-tel-link]").setAttribute("href", `tel:${contact.phone.replaceAll("-", "")}`);
      contactPanel.dataset.loaded = "true";
    }
  });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.getAttribute("data-copy");
    const value = contact[key];
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = "복사됨";
      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch {
      button.textContent = "복사 실패";
    }
  });
});
