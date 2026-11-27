const manuscriptExtension = /\.(?:docx?|pdf)$/i;
const maxManuscriptBytes = 15_000_000;

export function getManuscriptFileError(file: File): string {
	if (!manuscriptExtension.test(file.name)) {
		return "Choose a Word document (.docx or .doc) or a PDF.";
	}
	if (file.size === 0) {
		return "This file is empty. Choose a file with content.";
	}
	if (file.size > maxManuscriptBytes) {
		return "Choose a file of 15 MB or less, or paste a sharing link.";
	}
	return "";
}
