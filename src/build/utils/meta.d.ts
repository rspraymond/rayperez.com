export interface MetaTagValues {
    title: string;
    description: string;
    keywords: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
    twitterCreator?: string;
}
export declare const escapeHtml: (value?: string) => string;
export declare const buildMetaTags: (values: MetaTagValues) => string;
