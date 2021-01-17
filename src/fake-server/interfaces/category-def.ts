export interface CategoryDef {
    categoryName: string;
    slug: string;
    image?: string;
    items?: number;
    children?: CategoryDef[];
}
