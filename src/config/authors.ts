import type { ImageMetadata } from "astro";
import aikoTanabe from "@/assets/authors/aiko-tanabe.jpg";
import inesHaddad from "@/assets/authors/ines-haddad.jpg";
import malikOyelaran from "@/assets/authors/malik-oyelaran.jpg";
import rosaMarchetti from "@/assets/authors/rosa-marchetti.jpg";
import tomasFerreira from "@/assets/authors/tomas-ferreira.jpg";
import veraLindqvist from "@/assets/authors/vera-lindqvist.jpg";

/**
 * Author portraits, keyed by the `author.name` used in post frontmatter.
 * Authors with no entry fall back to a monogram avatar, so this map is
 * optional — add a name here only once you have a photo for it.
 *
 * The bundled portraits are Unsplash placeholders of models who have no
 * connection to these fictional bylines. Replace them with photos of your
 * actual contributors before publishing.
 *
 * Provenance of the bundled files, all Unsplash and all free to use without
 * attribution — kept here as a record for whoever swaps them out:
 *
 *   vera-lindqvist.jpg   Ayo Ogunseinde     unsplash.com/photos/8VghbLlZUdQ
 *   aiko-tanabe.jpg      Ryan Hoffman       unsplash.com/photos/2QDYXAEfFPk
 *   tomas-ferreira.jpg   mehdi pezhvak      unsplash.com/photos/43AUR3OGt3I
 *   malik-oyelaran.jpg   Albert Dera        unsplash.com/photos/ILip77SbmOE
 *   rosa-marchetti.jpg   Cemrecan Yurtman   unsplash.com/photos/ih03D0F6M6M
 *   ines-haddad.jpg      Junior REIS        unsplash.com/photos/p98UJsuyVRU
 */
export interface AuthorProfile {
  image: ImageMetadata;
}

export const authorProfiles: Record<string, AuthorProfile> = {
  "Vera Lindqvist": { image: veraLindqvist },
  "Aiko Tanabe": { image: aikoTanabe },
  "Tomás Ferreira": { image: tomasFerreira },
  "Malik Oyelaran": { image: malikOyelaran },
  "Rosa Marchetti": { image: rosaMarchetti },
  "Ines Haddad": { image: inesHaddad },
};

export const authorPortrait = (name: string): AuthorProfile | undefined => authorProfiles[name];
