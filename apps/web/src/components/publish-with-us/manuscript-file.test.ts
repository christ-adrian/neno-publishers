import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getManuscriptFileError } from "./manuscript-file";

describe("manuscript attachment", () => {
	for (const name of ["Sample.docx", "Sample.DOC", "Sample.pdf"]) {
		it(`accepts ${name}`, () => {
			assert.equal(getManuscriptFileError(new File(["draft"], name)), "");
		});
	}

	it("rejects unsupported formats and empty documents", () => {
		assert.equal(
			getManuscriptFileError(new File(["draft"], "sample.docx.exe")),
			"Choose a Word document (.docx or .doc) or a PDF."
		);
		assert.equal(
			getManuscriptFileError(new File([], "sample.pdf")),
			"This file is empty. Choose a file with content."
		);
	});

	it("accepts 15 MB and rejects anything larger", () => {
		const limit = new Uint8Array(15_000_000);
		assert.equal(getManuscriptFileError(new File([limit], "sample.pdf")), "");
		assert.equal(
			getManuscriptFileError(new File([limit, "x"], "sample.pdf")),
			"Choose a file of 15 MB or less, or paste a sharing link."
		);
	});
});
