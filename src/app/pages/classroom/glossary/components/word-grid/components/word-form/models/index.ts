export interface FormWord {
    original: string;
    translation: string;
    tips?: string;
    additionalTranslations?: Array<{ translation: string }>;
}