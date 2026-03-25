import type { ImageMetadata } from "astro";

const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/projects/**/*.{jpeg,jpg,png,webp,gif}",
  { eager: true }
);

/**
 * Resolves a public image path (e.g. "/images/projects/staw-makow/photo.jpeg")
 * to an ImageMetadata object for use with Astro's <Image> component.
 */
export function resolveProjectImage(
  publicPath: string
): ImageMetadata | undefined {
  const assetPath = publicPath.replace(
    "/images/projects/",
    "/src/assets/images/projects/"
  );
  return projectImages[assetPath]?.default;
}
