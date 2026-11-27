import Lenis from "lenis";
import "lenis/dist/lenis.css";

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
let lenis: Lenis | undefined;

function destroyLenis() {
	lenis?.destroy();
	lenis = undefined;
}

function syncLenis() {
	if (motion.matches) {
		lenis ??= new Lenis({ allowNestedScroll: true, autoRaf: true });
	} else {
		destroyLenis();
	}
}

document.addEventListener("astro:before-swap", () => {
	motion.removeEventListener("change", syncLenis);
	destroyLenis();
});

document.addEventListener("astro:page-load", () => {
	syncLenis();
	motion.addEventListener("change", syncLenis);
});

function cancelWheelInertia() {
	if (lenis?.isScrolling === "smooth") {
		lenis.stop();
		lenis.start();
	}
}

// Fragment navigation can bypass Astro's page swap.
document.addEventListener(
	"click",
	(event) => {
		if (
			event.target instanceof Element &&
			event.target.closest('a[href*="#"]')
		) {
			cancelWheelInertia();
		}
	},
	{ capture: true }
);

window.addEventListener("popstate", cancelWheelInertia, { capture: true });
