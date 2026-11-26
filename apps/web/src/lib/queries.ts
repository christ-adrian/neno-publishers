import { defineQuery } from "groq";

export const BOOKS_QUERY =
	defineQuery(`*[_type == "book" && defined(slug.current) && defined(title)] | order(featured desc, publishedYear desc, title asc, _id asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  publishedYear,
  priceKsh,
  featured,
  coverImage,
  "authors": coalesce((authors[]->)[defined(name)]{
    _id,
    name,
    "slug": slug.current
  }, [])
}`);

export const BOOK_BY_SLUG_QUERY =
	defineQuery(`*[_type == "book" && slug.current == $slug && defined(title)] | order(_id asc)[0] {
  _id,
  title,
  "slug": slug.current,
  category,
  summary,
  description,
  publishedYear,
  isbn,
  pages,
  priceKsh,
  coverImage,
  "authors": coalesce((authors[]->)[defined(name)]{
    _id,
    name,
    "slug": slug.current,
    credentials,
    photo,
    shortBio
  }, []),
  "testimonials": *[_type == "testimonial" && relatedBook._ref == ^._id] | order(displayOrder asc) {
    _id,
    quote,
    clientName,
    clientRole,
    avatar
  }
}`);

export const AUTHORS_QUERY =
	defineQuery(`*[_type == "author"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  credentials,
  photo,
  shortBio,
  "books": *[_type == "book" && references(^._id)] | order(publishedYear desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage
  }
}`);

export const AUTHOR_BY_SLUG_QUERY =
	defineQuery(`*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  credentials,
  photo,
  shortBio,
  bio,
  "books": *[_type == "book" && references(^._id)] | order(publishedYear desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage
  }
}`);

export const SERVICES_QUERY =
	defineQuery(`*[_type == "service"] | order(displayOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  printingType,
  shortDescription,
  deliverables,
  contactParam,
  featured
}`);

export const TEAM_MEMBERS_QUERY =
	defineQuery(`*[_type == "teamMember" && active == true] | order(displayOrder asc, name asc) {
  _id,
  name,
  role,
  photo,
  bio
}`);

export const TESTIMONIALS_QUERY =
	defineQuery(`*[_type == "testimonial" && featured == true] | order(displayOrder asc) {
  _id,
  quote,
  clientName,
  clientRole,
  avatar,
  "relatedBook": relatedBook->{
    title,
    "slug": slug.current
  }
}`);
