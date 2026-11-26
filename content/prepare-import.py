"""Write Sanity import NDJSON using the checked-in image files."""
import json
import sys
from pathlib import Path


CONTENT_DIR = Path(__file__).resolve().parent
DOCUMENT_FILES = (
    "authors.json",
    "books.json",
    "services.json",
    "team-members.json",
    "testimonials.json",
)


def read_json(filename):
    return json.loads((CONTENT_DIR / filename).read_text(encoding="utf-8"))


def prepare_document(document, assets):
    """Replace each local image reference with Sanity's asset import directive."""
    for value in document.values():
        if not isinstance(value, dict) or value.get("_type") != "image":
            continue
        asset_id = value["asset"]["_ref"]
        asset_path = (CONTENT_DIR / assets[asset_id]["path"]).resolve(strict=True)
        if not asset_path.is_relative_to(CONTENT_DIR / "assets"):
            raise ValueError(f"Asset is outside content/assets: {asset_path}")
        value.pop("asset")
        value["_sanityAsset"] = f"image@{asset_path.as_uri()}"
    return document


def main():
    assets = read_json("assets.json")
    documents = [
        prepare_document(document, assets)
        for filename in DOCUMENT_FILES
        for document in read_json(filename)
    ]
    for document in documents:
        print(json.dumps(document, ensure_ascii=False), file=sys.stdout)


if __name__ == "__main__":
    main()
