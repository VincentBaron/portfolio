import type { Language } from './translations';
import { getTranslations } from './translations';

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

const API_BASE_URL = import.meta.env.PUBLIC_LEAD_ENGINE_API_URL || 'http://localhost:5001/api';

// Mock Data for fallback
const MOCK_CATEGORIES: Category[] = [
    { value: 'Inform_SSII', label: 'IT & Software Services' },
    { value: 'Banq_assur_finan', label: 'Banking, Finance & Insurance' },
    { value: 'BTP', label: 'Construction & Public Works' },
    { value: 'Sante_social', label: 'Health & Social Sector' },
    { value: 'Distrib_commerce', label: 'Retail & Distribution' },
    { value: 'Agri_peche', label: 'Agriculture & Fishing' },
    { value: 'Industrie', label: 'Industry & Manufacturing' },
    { value: 'Transport_logistique', label: 'Transport & Logistics' }
];



export async function fetchCategories(): Promise<Category[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch(`${API_BASE_URL}/categories`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.warn('Backend unavailable (fetchCategories), using mock data:', error);
        // Fallback to mock data so the UI doesn't break on the demo site
        return MOCK_CATEGORIES;
    }
}

export async function searchLeads(
    categories: string[],
    limit: number = 10,
    tier: string = 'free'
): Promise<SearchResponse> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout for search

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
            signal: controller.signal
        });
        clearTimeout(timeoutId);


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
        console.warn('Backend unavailable (searchLeads), using mock data:', error);

        // Simulating network delay for realism if it was an instant failure
        if (!(error instanceof Error) || (error as Error).name !== 'AbortError') {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Import mocks dynamically to avoid huge bundle size if possible, or just use static import if size is manageable
        // For now, using static import as requested
        const { MOCK_DATA } = await import('./mocks');

        // Get mocks for the requested category
        const category = categories[0]; // We usually search one category at a time in the demo
        const mockResults = MOCK_DATA[category] || [];

        // Fallback to mock data
        return {
            results: mockResults,
            total: 124, // Mock total count
            categories: categories,
            tier: 'free'
        };
    }
}

