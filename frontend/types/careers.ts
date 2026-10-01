export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
export type WorkplaceType = 'On-site' | 'Remote' | 'Hybrid'

export interface JobPostingData {
  slug: string
  title: string
  department: string
  location: string
  employmentType: EmploymentType
  workplaceType: WorkplaceType
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave?: string[]
  postedDate: string // YYYY-MM-DD
  validThrough?: string // YYYY-MM-DD
  experienceLevel?: string
  status?: 'published' | 'draft' | 'closed'
}
