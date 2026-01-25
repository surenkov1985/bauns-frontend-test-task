import { closeMobile, toggleMobile, toggleSubmenu, utils } from "./methods";
import { appsFilterSlider } from "./swipers";
import { textHandler } from "./textHandler";

function setVhCssVar() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVhCssVar();

const handleResize = () => {
	setVhCssVar();
};
document.addEventListener("DOMContentLoaded", function () {
	const burgerBtn = document.querySelector(".btn-burger");
	const mobileLayout = document.querySelector(".mobile_layout");
	toggleSubmenu();
	appsFilterSlider();
	textHandler();

	burgerBtn.addEventListener("click", (e) => {
		toggleMobile();
	});
	mobileLayout.addEventListener("click", (e) => {
		closeMobile();
	});
});

window.addEventListener("resize", utils.debounce(handleResize, 200));
