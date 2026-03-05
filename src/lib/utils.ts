export function slugifyCategory(category: string): string {
    return category
        .toLowerCase()
        .normalize("NFD") // Decompose accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+&\s+/g, "-") // Replace " & " with "-"
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with "-"
        .replace(/^-+|-+$/g, ""); // Remove trailing/leading hyphens
}
