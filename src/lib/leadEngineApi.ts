import type { Language } from './translations';

export interface Category {
    value: string;
    label: string;
}

export interface Company {
    companyName: string;
    probability_score: number;
    linkedin_url?: string;
    company_website?: string;
}

export interface JobResult {
    jobTitle: string;
    agencyName: string;
    jobUrl: string;
    companies: Company[];
}

export interface SearchResponse {
    results: JobResult[];
    total: number;
    categories: string[];
    tier: string;
    freemium_notice?: string;
    error?: string;
}

const API_BASE_URL = 'http://localhost:5001/api';

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function searchLeads(
    categories: string[],
    limit: number = 10,
    tier: string = 'free'
): Promise<SearchResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categories,
                limit,
                tier,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // If it's a 403 (Freemium limit), we still might want to return the error message data
            if (response.status === 403) {
                throw new Error(data.error || 'Freemium limit reached');
            }
            throw new Error(data.error || 'Search failed');
        }

        return data;
    } catch (error) {
        console.error('Error searching leads:', error);
        throw error;
    }
}
