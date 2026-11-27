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

syncLenis();
motion.addEventListener("change", syncLenis);
window.addEventListener("pagehide", destroyLenis);
window.addEventListener("pageshow", syncLenis);

function cancelWheelInertia() {
	if (lenis?.isScrolling === "smooth") {
		lenis.stop();
		lenis.start();
	}
}

// Let native fragment navigation take over from an in-progress scroll.
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
