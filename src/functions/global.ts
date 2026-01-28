const COLLAPSE_HEADER_SCROLL = 5;

const headerContainer = document.querySelector("header > div")!;

const headerMobile = () => {
	const mobileMenuButton = document.getElementById("menu-toggle")!;
	const mobileMenu = document.getElementsByTagName("nav")[0]!;

	mobileMenuButton.addEventListener("click", () => {
		mobileMenu.classList.toggle("menu-open");
		const menuIcon = document.getElementById("menu-icon") as HTMLImageElement;
		if (menuIcon) {
			if (mobileMenu.classList.contains("menu-open")) {
				menuIcon.src = `${ICON_DIR}/close-outline.svg`;

				const handleClickOutside = (event: MouseEvent) => {
					if (
						!mobileMenu.contains(event.target as Node) &&
						!mobileMenuButton.contains(event.target as Node)
					) {
						mobileMenu.classList.remove("menu-open");
						menuIcon.src = `${ICON_DIR}/menu-outline.svg`;
						document.removeEventListener("click", handleClickOutside);
					}
				};
				setTimeout(() => {
					document.addEventListener("click", handleClickOutside);
				}, 0);
			} else {
				menuIcon.src = `${ICON_DIR}/menu-outline.svg`;
			}
		}
	});
}

const initHeaderScroll = () => {
	if (window.scrollY > COLLAPSE_HEADER_SCROLL) {
		setTimeout(() => {
			headerContainer?.classList.add("scrolled");
		}, 1500);
	}
}

const initHeroScroll = () => {
	const heroName = document.getElementById("hero-info")!;
	window.addEventListener("scroll", () => {
		if (heroName) {
			if (heroName?.getBoundingClientRect().y < 4) {
				if (!headerContainer?.classList.contains("scrolled"))
					headerContainer?.classList.add("scrolled");
			} else {
				if (headerContainer?.classList.contains("scrolled"))
					headerContainer?.classList.remove("scrolled");
			}
		} else {
			if (window.scrollY > COLLAPSE_HEADER_SCROLL) {
				if (!headerContainer?.classList.contains("scrolled"))
					headerContainer?.classList.add("scrolled");
			} else {
				if (headerContainer?.classList.contains("scrolled"))
					headerContainer?.classList.remove("scrolled");
			}
		}
	});
}

const initSkills = () => {
	const skillsItems = document.querySelectorAll(".skills-item") as NodeListOf<HTMLLIElement>;
	skillsItems.forEach((item) => {
		const level = item.getAttribute("data-skill");
		const skillBar = document.createElement("div");
		skillBar.classList.add("skills-item-bar");
		const skillLevel = document.createElement("div")
		if (level) {
			skillLevel.style.width = `${level}%`;
		}
		skillBar.appendChild(skillLevel);
		item.appendChild(skillBar);
	});
}

const initContactForm = () => {
	const contactForm = document.getElementById("contact-form") as HTMLFormElement;
	if (!contactForm) return;

	const formMessage = document.getElementById("form-message");
	const translationService = (window as any).translationService;
	
	contactForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		
		const submitButton = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
		const buttonText = submitButton?.querySelector('strong');
		
		if (submitButton) {
			submitButton.disabled = true;
			if (buttonText) {
				buttonText.setAttribute('data-i18n', 'contact-page.form.sending');
				buttonText.textContent = translationService?.getText('contact-page.form.sending');
			}
		}

		if (formMessage) {
			formMessage.classList.remove('form-message-show', 'form-message-success', 'form-message-error');
		}
		
		try {
			const formData = new FormData(contactForm);
			formData.append("access_key", EMAIL_ACCESS_KEY);
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData
			});
			
			const data = await response.json();
			
			if (data.success) {
				if (formMessage) {
					formMessage.textContent = translationService?.getText('contact-page.notifications.form-success');
					formMessage.classList.add('form-message-show', 'form-message-success');
				}
				contactForm.reset();				
				formMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
			} else {
				ErrorLayout.showError(data.message, translationService);
				throw new Error(data.message || "Submission failed");
			}
		} catch (error) {
			if (formMessage) {
				formMessage.textContent = translationService?.getText('contact-page.notifications.form-error');
				formMessage.classList.add('form-message-show', 'form-message-error');
			}
		} finally {
			if (submitButton) {
				submitButton.disabled = false;
				if (buttonText) {
					buttonText.setAttribute('data-i18n', 'contact-page.form.send');
					buttonText.textContent = translationService?.getText('contact-page.form.send');
				}
			}
		}
	});
}

const globalEvent = () => {
	headerMobile();
	initHeaderScroll();
	initHeroScroll();
	initSkills();
	initContactForm();
};
