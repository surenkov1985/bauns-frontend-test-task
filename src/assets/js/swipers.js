import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

export const appsFilterSlider = () => {
	const appsFilter = document.querySelector(".apps__filter_list");

	if (!appsFilter) return;

	const slider = new Swiper(appsFilter, {
		modules: [FreeMode],
		slidesPerView: "auto",
		freeMode: true,
		spaceBetween: 0,
		breakpoints: {
			576: {
				spaceBetween: 4,
			},
		},
	});
};
