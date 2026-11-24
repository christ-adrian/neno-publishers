import { afterAll, beforeAll, expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import { spawn } from "bun";
import { chromium } from "playwright";

const appDirectory = fileURLToPath(new URL("../", import.meta.url));
const serverAddress = /Server listening on (http:\/\/127\.0\.0\.1:\d+)/;
const destinations = ["/about", "/services", "/books", "/authors", "/contact"];

let server;
let browser;
let baseURL;

beforeAll(async () => {
	server = spawn(["node", "dist/server/entry.mjs"], {
		cwd: appDirectory,
		env: { ...process.env, HOST: "127.0.0.1", PORT: "0" },
		stdout: "pipe",
	});

	let logs = "";
	for await (const chunk of server.stdout.pipeThrough(
		new TextDecoderStream()
	)) {
		logs += chunk;
		const [, address] = logs.match(serverAddress) ?? [];
		if (address) {
			baseURL = address;
			break;
		}
	}
	if (!baseURL) {
		throw new Error(
			`Astro preview server failed to start. Run bun run build first.\n${logs}`
		);
	}

	browser = await chromium.launch();
}, 15_000);

afterAll(async () => {
	await browser?.close();
	server?.kill();
	await server?.exited;
});

test("the homepage serves Bookplate and retires the prototype route", async () => {
	const page = await browser.newPage();
	try {
		await page.goto(`${baseURL}/`);
		expect(await page.title()).toBe("Neno Publishers");
		expect(await page.locator("main > .hero").count()).toBe(1);
		expect(await page.locator(".proto-picker").count()).toBe(0);
		const retired = await page.request.get(`${baseURL}/prototypes/header-hero`);
		expect(retired.status()).toBe(404);
	} finally {
		await page.close();
	}
});

test("the shared header floats on scroll and returns to the top state", async () => {
	const page = await browser.newPage({
		reducedMotion: "reduce",
		viewport: { height: 400, width: 1306 },
	});
	try {
		await page.goto(`${baseURL}/`);
		const nav = page.getByRole("navigation", { name: "Main navigation" });
		expect(await nav.getByRole("link").count()).toBe(destinations.length);

		const targets = await nav
			.getByRole("link")
			.evaluateAll((anchors) => anchors.map((link) => link.pathname));
		expect(targets).toEqual(destinations);

		const links = nav.getByRole("link");
		expect(await links.last().innerText()).toBe("Contact Us");
		const logo = page.getByRole("link", { name: "Neno Publishers home" });
		const publish = page.getByRole("link", { name: "Publish With Us" });
		const logoBox = await logo.boundingBox();
		const firstLink = await links.first().boundingBox();
		const lastLink = await links.last().boundingBox();
		const publishBox = await publish.boundingBox();
		expect(firstLink.x - logoBox.x - logoBox.width).toBeLessThan(24);
		expect(publishBox.x - lastLink.x - lastLink.width).toBeGreaterThan(24);

		const header = page.locator("[data-site-header]");
		const panel = header.locator(".header-frame");
		expect(
			await header.evaluate(
				(element) => getComputedStyle(element).backgroundColor
			)
		).toBe("rgba(0, 0, 0, 0)");
		expect(
			await header.evaluate(
				(element) => getComputedStyle(element, "::before").content
			)
		).toBe("none");
		expect(
			await panel.evaluate(
				(element) => getComputedStyle(element, "::before").opacity
			)
		).toBe("0");

		await page.evaluate(() => window.scrollTo(0, 200));
		await page.waitForSelector("[data-site-header][data-floating]");
		expect(
			await panel.evaluate(
				(element) => getComputedStyle(element, "::before").opacity
			)
		).toBe("1");
		expect(await publish.getAttribute("href")).toBe("/publish-with-us");
		await logo.click();
		await page.waitForSelector("[data-site-header]:not([data-floating])");
	} finally {
		await page.close();
	}
});

test("mobile navigation supports keyboard opening, dismissal, and route links", async () => {
	const page = await browser.newPage({ viewport: { height: 700, width: 320 } });
	try {
		await page.goto(`${baseURL}/`);
		const menu = page.locator("[data-mobile-menu]");
		const trigger = menu.locator("summary");
		const publish = page.getByRole("link", { name: "Publish With Us" });
		const publishBox = await publish.boundingBox();
		expect(publishBox.x + publishBox.width).toBeLessThanOrEqual(320);
		await trigger.focus();
		await page.keyboard.press("Enter");
		await menu.getByRole("link", { name: "Our Authors" }).waitFor();
		await page.keyboard.press("Escape");
		expect(await menu.getAttribute("open")).toBeNull();
		expect(
			await trigger.evaluate((element) => element === document.activeElement)
		).toBe(true);

		await page.keyboard.press("Enter");
		expect(
			await menu.getByRole("link", { name: "Our Authors" }).getAttribute("href")
		).toBe("/authors");
		await page.getByRole("main").click({ position: { x: 8, y: 200 } });
		expect(await menu.getAttribute("open")).toBeNull();
	} finally {
		await page.close();
	}
});

const viewports = [
	{ gutter: 16, padding: "16px", width: 320 },
	{ gutter: 16, padding: "40px", width: 768 },
	{ gutter: 17.92, padding: "40px", width: 896 },
	{ gutter: 26.12, padding: "40px", width: 1306 },
	{ gutter: 28.8, padding: "40px", width: 1440 },
	{ gutter: 32, padding: "40px", width: 1920 },
];
test.each(viewports)(
	"layout eval preserves gutters and copy at %p",
	async ({ gutter, padding, width }) => {
		const page = await browser.newPage({
			reducedMotion: "reduce",
			viewport: { height: 873, width },
		});
		try {
			await page.goto(`${baseURL}/`);
			await page.waitForFunction(
				() => {
					const heroImage = document.querySelector(".hero-image");
					const logo = document.querySelector(".logo-link img");
					return heroImage?.naturalWidth > 0 && logo?.naturalWidth > 0;
				},
				undefined,
				{ timeout: 5000 }
			);
			await page.evaluate(() => document.fonts.ready);

			const hero = page.locator("main > .hero");
			const frame = await hero.boundingBox();
			expect(frame.x).toBeCloseTo(gutter, 0);
			expect(width - frame.width - frame.x).toBeCloseTo(gutter, 0);
			expect(
				await hero.evaluate((element) => {
					const { paddingBlockStart, paddingInlineStart } =
						getComputedStyle(element);
					return [paddingBlockStart, paddingInlineStart];
				})
			).toEqual(["48px", padding]);
			const panel = hero.locator(".hero-copy");
			expect(
				await panel.evaluate(
					(element) => getComputedStyle(element).backgroundColor
				)
			).toBe("rgb(14, 116, 166)");
			const panelFrame = await panel.boundingBox();
			expect(
				frame.x + frame.width - (panelFrame.x + panelFrame.width)
			).toBeCloseTo(Number.parseInt(padding, 10), 0);
			const heading = hero.locator("h1");
			expect(await heading.innerText()).toBe("YOUR WORK\nOUR PRIORITY");
			const headlineLines = await heading.locator("span").evaluateAll((lines) =>
				lines.map((line) => {
					const range = document.createRange();
					range.selectNodeContents(line);
					return range.getClientRects().length;
				})
			);
			expect(headlineLines).toEqual([1, 1]);
			expect(await hero.locator("p").innerText()).toBe(
				"Transforming your manuscript into a masterpiece with Kenya’s premier publishing, printing, and advisory team."
			);
			expect(
				await page.evaluate(() => document.documentElement.scrollWidth)
			).toBe(width);

			const transition = await page
				.locator(".header-frame")
				.evaluate((element) => getComputedStyle(element).transitionDuration);
			expect(transition).toBe("0s");
		} finally {
			await page.close();
		}
	},
	10_000
);

test("the hero shows both future page links below the copy", async () => {
	const page = await browser.newPage({ viewport: { height: 700, width: 320 } });
	try {
		await page.goto(`${baseURL}/`);
		const actions = page.locator("main .hero-description + .hero-actions");
		const submit = actions.getByRole("link", {
			exact: true,
			name: "Submit Your Manuscript",
		});
		const contact = actions.getByRole("link", {
			exact: true,
			name: "Need help? Talk to us",
		});
		expect(await submit.getAttribute("href")).toBe("/publish-with-us");
		expect(await contact.getAttribute("href")).toBe("/contact");
		expect(await submit.isVisible()).toBe(true);
		expect(await contact.isVisible()).toBe(true);
	} finally {
		await page.close();
	}
});
