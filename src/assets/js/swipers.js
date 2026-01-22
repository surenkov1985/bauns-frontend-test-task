import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination, Grid, Navigation } from "swiper/modules";

export const initHeroSlider = () => {
	const heroSlider = document.querySelector(".hero__slider");
	if (!heroSlider) return;

	const slider = new Swiper(heroSlider, {
		loop: true,
		allowTouchMove: false,
		fadeEffect: {
			crossFade: true,
		},
		speed: 1500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		effect: "fade",
		spaceBetween: 10,
		modules: [Autoplay, Pagination, EffectFade],
		pagination: {
			el: ".hero__slider_pagination",
			clickable: false,
			renderBullet: function (_, className) {
				return '<span class="' + className + '"><span class"before"></span></span>';
			},
		},
		on: {
			slideChange: (swiper) => {
				swiper.pagination.bullets.forEach((item) => {
					item.style.setProperty("--progress-width", "0%");
				});
			},
			autoplayTimeLeft: (s, _, progress) => {
				const activeBullet = s.pagination.bullets[s.realIndex] || s.pagination.bullets[s.activeIndex];

				if (activeBullet) {
					activeBullet.style.setProperty("--progress-width", `${(1 - progress) * 100}%`);
				}
			},
		},
	});
};

export const initBrandsSlider = () => {
	const brands = document.querySelector(".brands__list.swiper");

	if (!brands) return;

	const brandsContainer = brands.closest(".brands");

	const brandsSlider = new Swiper(brands, {
		slidesPerView: 2,
		spaceBetween: 16,
		breakpoints: {
			360: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			576: {
				slidesPerView: 2.5,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			1440: {
				slidesPerView: 5,
			},
		},
	});
};

export const initTopCatalogSlider = () => {
	const topCatalog = document.querySelector(".catalog-top");

	if (!topCatalog) return;

	const topCatalogSlider = new Swiper(topCatalog, {
		// enabled: false,
		slidesPerView: 4,
		spaceBetween: 16,
		createElements: true,
		modules: [Grid],
		grid: {
			fill: "row",
			rows: 2,
		},
		breakpoints: {
			320: {
				slidesPerView: 1.2,
				spaceBetween: 14,
				grid: {
					fill: "row",
					rows: 1,
				},
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 16,
				grid: {
					fill: "row",
					rows: 4,
				},
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 20,
				grid: {
					fill: "row",
					rows: 3,
				},
			},
			1440: {
				slidesPerView: 4,
				spaceBetween: 24,
				grid: {
					fill: "row",
					rows: 2,
				},
			},
		},
	});
};

export const initPartnersSlider = () => {
	const partners = document.querySelector(".partners__slider");

	if (!partners) return;

	const sliderContainer = partners.closest(".partners");
	const partnersControl = sliderContainer.querySelector(".partners__slider_control");

	const slider = new Swiper(partners, {
		slidesPerView: 1.2,
		slidesPerGroup: 1,
		modules: [Pagination, Navigation, Autoplay],
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".partners__slider_pagination",
			type: "fraction",
			formatFractionCurrent(num) {
				return num.toString().padStart(2, "0");
			},
			formatFractionTotal(num) {
				return num.toString().padStart(2, "0");
			},
		},
		navigation: {
			prevEl: partnersControl.querySelector(".swiper_prev"),
			nextEl: partnersControl.querySelector(".swiper_next"),
		},
		breakpoints: {
			350: {
				slidesPerView: 1.5,
			},
			576: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
};

export const initSertificatesSlider = () => {
	const sertificates = document.querySelector(".sertificates__slider");

	if (!sertificates) return;

	const sliderContainer = sertificates.closest(".sertificates");
	const sertificatesControl = sliderContainer.querySelector(".sertificates__slider_control");

	const slider = new Swiper(sertificates, {
		slidesPerView: 1.2,
		slidesPerGroup: 1,
		spaceBetween: 12,
		modules: [Pagination, Navigation, Autoplay],
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".sertificates__slider_pagination",
			type: "fraction",
			formatFractionCurrent(num) {
				return num.toString().padStart(2, "0");
			},
			formatFractionTotal(num) {
				return num.toString().padStart(2, "0");
			},
		},
		navigation: {
			prevEl: sertificatesControl.querySelector(".swiper_prev"),
			nextEl: sertificatesControl.querySelector(".swiper_next"),
		},
		breakpoints: {
			350: {
				slidesPerView: 1.5,
				spaceBetween: 12,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			1440: {
				slidesPerView: 4,
				spaceBetween: 50,
			},
		},
	});
};

export const initAboutAdvsSlider = () => {
	const aboutAdvsSlider = document.querySelector(".about__advs_slider");

	if (!aboutAdvsSlider) return;

	const sliderContainer = aboutAdvsSlider.closest(".about__advs");
	const aboutAdvsSliderControl = sliderContainer.querySelector(".about__advs_slider_control");

	const slider = new Swiper(aboutAdvsSlider, {
		slidesPerView: 1.1,
		slidesPerGroup: 1,
		spaceBetween: 12,
		createElements: true,
		modules: [Pagination, Navigation, Autoplay],
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".about__advs_slider_pagination",
			type: "fraction",
			formatFractionCurrent(num) {
				return num.toString().padStart(2, "0");
			},
			formatFractionTotal(num) {
				return num.toString().padStart(2, "0");
			},
		},
		navigation: {
			prevEl: aboutAdvsSliderControl.querySelector(".swiper_prev"),
			nextEl: aboutAdvsSliderControl.querySelector(".swiper_next"),
		},
		breakpoints: {
			350: {
				slidesPerView: 1.2,
				spaceBetween: 8,
			},
			576: {
				slidesPerView: 1.8,
				spaceBetween: 12,
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: 2,
				spaceBetween: 25,
			},
		},
	});
}
