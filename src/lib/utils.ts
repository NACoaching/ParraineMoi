export function slugifyCategory(category: string): string {
    return category
        .toLowerCase()
        .normalize("NFD") // Decompose accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+&\s+/g, "-") // Replace " & " with "-"
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with "-"
        .replace(/^-+|-+$/g, ""); // Remove trailing/leading hyphens
}

export function replaceDatePlaceholders(text: string): string {
    if (!text) return text;
    const now = new Date();
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const month = months[now.getMonth()];
    const year = now.getFullYear().toString();
    
    return text
        .replace(/\{\{MONTH\}\}/g, month)
        .replace(/\{\{YEAR\}\}/g, year);
}

export function formatVerifiedDate(dateStr?: string): string {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    return `${d} ${months[m - 1]} ${y}`;
}

