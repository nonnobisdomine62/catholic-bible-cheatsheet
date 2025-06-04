export interface Verse {
  reference: string;
  text: string;
}

export interface Subsection {
  name: string;
  verses: Verse[];
}

export interface Section {
  title: string;
  description?: string;
  verses?: Verse[];
  subsections?: Subsection[];
}

export interface BibleVerses {
  sections: Section[];
}

export interface HeresiesChecklist {
  catholic_teachings_about_jesus: string[];
  heresies: Array<{
    name: string;
    false_teaching: string;
    catholic_truth: string;
  }>;
} 