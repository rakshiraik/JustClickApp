import { CategoryDef } from '../interfaces/category-def';
import { Category } from '../../app/shared/interfaces/category';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

let lastCategoryId = 0;

const shopCategoriesDef: CategoryDef[] = [
    {
        categoryName: 'Instruments',
        slug: 'instruments',
        items: 272,
        children: [
            {
                categoryName: 'Power Tools',
                slug: 'power-tools',
                image: 'assets/images/categories/gold.png',
                items: 370,
                children: [
                    {
                        categoryName: 'Drills & Mixers',
                        slug: 'drills-mixers',
                        items: 57,
                    },
                    {
                        categoryName: 'Cordless Screwdrivers',
                        slug: 'cordless-screwdrivers',
                        items: 15,
                    },
                    {
                        categoryName: 'Screwdrivers',
                        slug: 'screwdrivers',
                        items: 126,
                    },
                    {
                        categoryName: 'Wrenches',
                        slug: 'wrenches',
                        items: 12,
                    },
                    {
                        categoryName: 'Grinding Machines',
                        slug: 'grinding-machines',
                        items: 25,
                    },
                    {
                        categoryName: 'Milling Cutters',
                        slug: 'milling-cutters',
                        items: 78,
                    },
                    {
                        categoryName: 'Electric Spray Guns',
                        slug: 'electric-spray-guns',
                        items: 3,
                    },
                ],
            },
            {
                categoryName: 'Hand Tools',
                slug: 'hand-tools',
                image: 'assets/images/categories/category-2.jpg',
                items: 134,
                children: [
                    {
                        categoryName: 'Tool Kits',
                        slug: 'tool-kits',
                        items: 57,
                    },
                    {
                        categoryName: 'Hammers',
                        slug: 'hammers',
                        items: 15,
                    },
                    {
                        categoryName: 'Spanners',
                        slug: 'spanners',
                        items: 5,
                    },
                    {
                        categoryName: 'Handsaws',
                        slug: 'handsaws',
                        items: 54,
                    },
                    {
                        categoryName: 'Paint Tools',
                        slug: 'paint-tools',
                        items: 13,
                    },
                ],
            },
            {
                categoryName: 'Machine Tools',
                slug: 'machine-tools',
                image: 'assets/images/categories/category-3.jpg',
                items: 302,
                children: [
                    {
                        categoryName: 'Lathes',
                        slug: 'lathes',
                        items: 104,
                    },
                    {
                        categoryName: 'Milling Machines',
                        slug: 'milling-machines',
                        items: 12,
                    },
                    {
                        categoryName: 'Grinding Machines',
                        slug: 'grinding-machines',
                        items: 67,
                    },
                    {
                        categoryName: 'CNC Machines',
                        slug: 'cnc-machines',
                        items: 5,
                    },
                    {
                        categoryName: 'Sharpening Machines',
                        slug: 'sharpening-machines',
                        items: 88,
                    },
                ],
            },
            {
                categoryName: 'Power Machinery',
                slug: 'power-machinery',
                image: 'assets/images/categories/category-4.jpg',
                items: 79,
                children: [
                    {
                        categoryName: 'Generators',
                        slug: 'generators',
                        items: 23,
                    },
                    {
                        categoryName: 'Compressors',
                        slug: 'compressors',
                        items: 76,
                    },
                    {
                        categoryName: 'Winches',
                        slug: 'winches',
                        items: 43,
                    },
                    {
                        categoryName: 'Plasma Cutting',
                        slug: 'plasma-cutting',
                        items: 128,
                    },
                    {
                        categoryName: 'Electric Motors',
                        slug: 'electric-motors',
                        items: 76,
                    },
                ],
            },
            {
                categoryName: 'Measurement',
                slug: 'measurement',
                image: 'assets/images/categories/category-5.jpg',
                items: 366,
                children: [
                    {
                        categoryName: 'Tape Measure',
                        slug: 'tape-measure',
                        items: 57,
                    },
                    {
                        categoryName: 'Theodolites',
                        slug: 'theodolites',
                        items: 5,
                    },
                    {
                        categoryName: 'Thermal Imagers',
                        slug: 'thermal-imagers',
                        items: 3,
                    },
                    {
                        categoryName: 'Calipers',
                        slug: 'calipers',
                        items: 37,
                    },
                    {
                        categoryName: 'Levels',
                        slug: 'levels',
                        items: 14,
                    },
                ],
            },
            {
                categoryName: 'Clothes and PPE',
                slug: 'clothes-and-ppe',
                image: 'assets/images/categories/category-6.jpg',
                items: 82,
                children: [
                    {
                        categoryName: 'Winter Workwear',
                        slug: 'winter-workwear',
                        items: 24,
                    },
                    {
                        categoryName: 'Summer Workwear',
                        slug: 'summer-workwear',
                        items: 87,
                    },
                    {
                        categoryName: 'Helmets',
                        slug: 'helmets',
                        items: 9,
                    },
                    {
                        categoryName: 'Belts and Bags',
                        slug: 'belts-and-bags',
                        items: 1,
                    },
                    {
                        categoryName: 'Work Shoes',
                        slug: 'work-shoes',
                        items: 0,
                    },
                ],
            },
        ],
    },
    {
        categoryName: 'Electronics',
        slug: 'electronics',
        items: 54,
    },
    {
        categoryName: 'Computers',
        slug: 'computers',
        items: 421,
    },
    {
        categoryName: 'Automotive',
        slug: 'automotive',
        items: 182,
    },
    {
        categoryName: 'Furniture & Appliances',
        slug: 'furniture-appliances',
        items: 15,
    },
    {
        categoryName: 'Music & Books',
        slug: 'music-books',
        items: 89,
    },
    {
        categoryName: 'Health & Beauty',
        slug: 'health-beauty',
        items: 201,
    },
];
const blogCategoriesDef: CategoryDef[] = [
    {
        categoryName: 'Latest News',
        slug: 'latest-news',
    },
    {
        categoryName: 'Special Offers',
        slug: 'special-offers',
        children: [
            {
                categoryName: 'Spring Sales',
                slug: 'spring-sales',
            },
            {
                categoryName: 'Summer Sales',
                slug: 'summer-sales',
            },
            {
                categoryName: 'Autumn Sales',
                slug: 'autumn-sales',
            },
            {
                categoryName: 'Christmas Sales',
                slug: 'christmas-sales',
            },
            {
                categoryName: 'Other Sales',
                slug: 'other-sales',
            }
        ],
    },
    {
        categoryName: 'New Arrivals',
        slug: 'new-arrivals',
    },
    {
        categoryName: 'Reviews',
        slug: 'reviews',
    },
    {
        categoryName: 'Drills and Mixers',
        slug: 'drills-and-mixers',
    },
    {
        categoryName: 'Cordless Screwdrivers',
        slug: 'cordless-screwdrivers',
    },
    {
        categoryName: 'Screwdrivers',
        slug: 'screwdrivers',
    },
    {
        categoryName: 'Wrenches',
        slug: 'wrenches',
    },
];

function walkTree(categoriesType: 'shop'|'blog', categoriesDef: CategoryDef[], parents: Category[] = []): [Category[], Category[]] {
    let list: Category[] = [];
    const tree: Category[] = categoriesDef.map(categoryDef => {
        const category: Category = {
            id: ++lastCategoryId,
            type: categoriesType,
            categoryName: categoryDef.categoryName,
            slug: categoryDef.slug,
            path: [...parents.map(x => x.slug), categoryDef.slug].join('/'),
            image: categoryDef.image || null,
            items: categoryDef.items || 0,
            customFields: {},
            parents: parents.slice(),
            children: [],
        };

        const [childrenTree, childrenList] = walkTree(categoriesType, categoryDef.children || [], [...parents, category]);

        category.children = childrenTree;
        list = [...list, category, ...childrenList];

        return category;
    });

    return [tree, list];
}

export const [shopCategoriesTree, shopCategoriesList]: [Category[], Category[]] = walkTree('shop', shopCategoriesDef);
export const [blogCategoriesTree, blogCategoriesList]: [Category[], Category[]] = walkTree('blog', blogCategoriesDef);

function limitDepth(categories: Category[], depth: number): Category[] {
    return categories.map(category => {
        return {
            ...category,
            parents: null,
            children: depth !== 0 ? limitDepth(category.children, depth - 1) : null,
        };
    });
}

function getCategoriesTree(categoriesType: 'shop'|'blog', parentSlug: string = null, depth: number = 0): Observable<Category[]> {
    let categories = [];
    const list = categoriesType === 'shop' ? shopCategoriesList : blogCategoriesList;
    const tree = categoriesType === 'shop' ? shopCategoriesTree : blogCategoriesTree;

    if (parentSlug === null) {
        categories = tree.slice();
    } else {
        const parent = list.find(x => x.slug === parentSlug);

        if (!parent) {
            return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
        }

        categories = parent.children.slice();
    }

    return of(limitDepth(categories, depth));
}

export function getShopCategoriesTree(parentSlug: string = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('shop', parentSlug, depth);
}

export function getBlogCategoriesTree(parentSlug: string = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('blog', parentSlug, depth);
}

export function getShopCategoriesBySlugs(slugs: string[], depth: number = 0): Observable<Category[]> {
    return of(limitDepth(shopCategoriesList.filter(x => slugs.includes(x.slug)), depth));
}

export function getShopCategory(slug: string): Observable<Category> {
    const category = shopCategoriesList.find(x => x.slug === slug);

    if (!category) {
        return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
    }

    return of(JSON.parse(JSON.stringify({
        ...category,
        parents: limitDepth(category.parents, 0),
        children: limitDepth(category.children, 0),
    })));
}
