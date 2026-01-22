import { loadScript, setMap, utils } from "./methods";
import { initAboutAdvsSlider, initBrandsSlider, initHeroSlider, initPartnersSlider, initSertificatesSlider, initTopCatalogSlider } from "./swipers";
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
	initHeroSlider();
	initBrandsSlider();
	initTopCatalogSlider();
	initPartnersSlider();
	initSertificatesSlider();
	initAboutAdvsSlider();

	loadScript(window.location.protocol + "//api-maps.yandex.ru/2.1.79/?lang=ru_RU", setMap);

	textHandler();
});

window.addEventListener("resize", utils.debounce(handleResize, 200));
