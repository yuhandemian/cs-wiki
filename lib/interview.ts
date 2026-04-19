import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const interviewDirectory = path.join(process.cwd(), 'interview');

export const categorySlugToDir: Record<string, string> = {
    'algorithm': 'Algorithm',
    'data-structure': 'Data-Structure',
    'database': 'Database',
    'java': 'Java',
    'network': 'Network',
    'operating-system': 'Operating-System',
    'spring': 'Spring',
};

export interface InterviewMetadata {
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    frequency: 'low' | 'medium' | 'high';
}

export interface InterviewQuestion {
    slug: string;
    category: string; 
    metadata: InterviewMetadata;
    content: string;
}

export function getAllInterviewCategories(): string[] {
    if (!fs.existsSync(interviewDirectory)) {
        return [];
    }
    const categories = fs.readdirSync(interviewDirectory);
    return categories.filter((category) => {
        const categoryPath = path.join(interviewDirectory, category);
        return fs.statSync(categoryPath).isDirectory();
    });
}

export function getInterviewQuestionsByCategory(categorySlug: string): InterviewQuestion[] {
    const categoryDir = categorySlugToDir[categorySlug] || categorySlug;
    const categoryPath = path.join(interviewDirectory, categoryDir);

    if (!fs.existsSync(categoryPath)) {
        return [];
    }

    const files = fs.readdirSync(categoryPath);
    const questions = files
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const fullPath = path.join(categoryPath, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                category: categorySlug,
                metadata: data as InterviewMetadata,
                content,
            };
        });

    return questions;
}
