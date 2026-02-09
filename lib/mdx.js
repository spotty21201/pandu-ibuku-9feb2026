import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getDomainSlugs() {
    return fs.readdirSync(contentDirectory).filter((file) => {
        return fs.statSync(path.join(contentDirectory, file)).isDirectory();
    });
}

export function getEntries(domain) {
    const domainPath = path.join(contentDirectory, domain);
    if (!fs.existsSync(domainPath)) return [];

    const files = fs.readdirSync(domainPath);

    return files
        .filter((file) => file.endsWith(".md") && file !== "intro.md")
        .map((file) => {
            const slug = file.replace(/\.md$/, "");
            const fullPath = path.join(domainPath, file);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                ...data,
                domain,
            };
        });
}

export function getIntro(domain) {
    const introPath = path.join(contentDirectory, domain, "intro.md");
    if (!fs.existsSync(introPath)) return null;

    const fileContents = fs.readFileSync(introPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        ...data,
        content,
    };
}

export function getEntry(domain, slug) {
    const fullPath = path.join(contentDirectory, domain, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        ...data,
        content,
        domain,
    };
}
