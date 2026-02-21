'use server';
/**
 * @fileOverview A Genkit flow for generating engaging real estate property descriptions.
 *
 * - generatePropertyDescription - A function that handles the property description generation process.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  squareFootage: z.number().describe('The total square footage of the property.'),
  bedrooms: z.number().describe('The number of bedrooms in the property.'),
  style: z.string().describe('The architectural style of the property (e.g., modern, traditional, colonial).'),
  neighborhoodFeatures: z.string().describe('Key features and amenities of the surrounding neighborhood (e.g., parks, schools, shops, quiet streets).'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('A unique and engaging property description for a real estate listing.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(input: GeneratePropertyDescriptionInput): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const generatePropertyDescriptionPrompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter. Your task is to create a unique, engaging, and persuasive property description for a real estate listing, tailored for a prospective buyer.

Use the following property details and neighborhood features to craft a compelling description, highlighting the best aspects to entice interest and encourage inquiries.

Property Details:
- Square Footage: {{{squareFootage}}} sq ft
- Bedrooms: {{{bedrooms}}}
- Style: {{{style}}}

Neighborhood Features: {{{neighborhoodFeatures}}}

Craft a narrative that paints an appealing picture of living in this home and neighborhood. Focus on benefits and emotional connection, not just facts.

Please provide the description in JSON format, adhering strictly to the following schema:
```json
{{jsonSchema GeneratePropertyDescriptionOutputSchema}}
```
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await generatePropertyDescriptionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate property description.');
    }
    return output;
  }
);
