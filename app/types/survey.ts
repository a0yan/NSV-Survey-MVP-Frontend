// app/types/survey.ts

export interface Survey {
  id: string;
  title: string;
  location: string;
  surveyId: string;
  date: string;
  user: string;
  status: 'Approved' | 'Submitted' | 'Draft';
  video_link?: string;
}
