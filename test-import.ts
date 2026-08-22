// Test file to demonstrate proper CaseStudy type usage

import { CaseStudy } from './lib/types'

// Correct: Using CaseStudy as a type annotation
const caseStudyExample: CaseStudy = {
  slug: 'test-case-study',
  title: 'Test Case Study',
  date: '2025-01-15',
  client: 'Test Client',
  description: 'This is a test case study description',
  technicalStack: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  outcomes: ['Improved type safety', 'Fixed compilation errors', 'Enhanced user experience'],
  content: 'Full case study content here...'
}

// Correct: Using CaseStudy in function parameter type annotation
function processCaseStudy(caseStudy: CaseStudy): string {
  return `Processing: ${caseStudy.title}`
}

// Correct: Using CaseStudy as return type annotation
function getCaseStudyTemplate(): CaseStudy {
  return {
    slug: '',
    title: '',
    date: '',
    client: '',
    description: '',
    technicalStack: [],
    outcomes: [],
    content: ''
  }
}

// Example usage
const processedTitle = processCaseStudy(caseStudyExample)
const template = getCaseStudyTemplate()

console.log('CaseStudy import and usage test completed successfully!')