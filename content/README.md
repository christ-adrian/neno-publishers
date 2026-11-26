# Neno Publishers source content

These are local Sanity documents for the five types registered by [Studio](../apps/web/sanity.config.ts). They were prepared from the public WordPress site. The book catalog and detail pages read published documents from the configured Sanity dataset.

| File | Sanity type | Documents |
| --- | --- | ---: |
| `authors.json` | `author` | 30 |
| `books.json` | `book` | 27 |
| `services.json` | `service` | 23 |
| `team-members.json` | `teamMember` | 3 |
| `testimonials.json` | `testimonial` | 1 |

## Sources and mapping

Firecrawl retrieved the [book gallery](https://nenopublishers.co.ke/our-book/) and [homepage](https://nenopublishers.co.ke/). The linked [book descriptions](https://nenopublishers.co.ke/our-books/), [author directory](https://nenopublishers.co.ke/our-authors/), [services page](https://nenopublishers.co.ke/services-3/), and book portfolio pages supplied supporting details. `sources.json` maps document IDs to their evidence.

- The 27 books cover 19 unique gallery entries, six additional homepage titles, and two extra titles on the linked detailed catalog. Repeated covers are counted once.
- Book credits resolve to author documents. The authors credited as HillRose are stored individually, and their shared photograph is stored once. Book descriptions and full author biographies use Portable Text paragraphs.
- Summaries are editorial paraphrases of the page or cover. When a listing provides only the title and credit, its summary describes the listing conservatively. Categories map to the existing Studio choices and are editorial assignments where a genre was not published. The homepage portfolio determines which books are featured.
- Service entries follow the headings on the services page, with digital printing from the homepage. Short descriptions identify the named offerings. The testimonial uses the published client attribution and quote.
- Publication years and page counts use the detailed catalog where it supplied them. Unverified bibliographic fields and prices are omitted. Author-only mentions without a verified cover are represented by their author profiles. These are *HR Practice: A Rear View with Salome Gitoho*, *Unleashing the Greatness Within*, *Unstoppable Zeal*, *Shadows and the Light*, and *Six Main Keys to Unblock God's Kingdom*.
- `assets.json` records the 47 JPEG paths, source URLs, dimensions, and SHA-256 digests. The files are the original bytes served by the website. The book documents include front-cover crops for nine print spreads. The checked-in images retain the original spreads. The complete *As Life Unfolds* cover came from its portfolio page because the gallery upload could not be fully downloaded. Logos and other layout imagery have no fields in these five schemas.

## Prepare the local import file

Run the following from the repository root. It produces NDJSON in `/tmp` with absolute local file URIs for the original images. The generator only reads this folder.

```bash
python3 content/prepare-import.py > /tmp/neno-publishers.ndjson
```

The JSON source files keep Sanity image objects and reference fields. During a later [Sanity CLI import](https://www.sanity.io/docs/apis-and-sdks/importing-data), Sanity replaces the generated asset directives with references to its uploaded images. The stable document IDs preserve the relationships across reruns.
