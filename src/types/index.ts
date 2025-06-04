export interface Verse {
  reference: string;
  text: string;
  note?: string;
}

export interface Subcategory {
  name: string;
  verses: Verse[];
}

export interface Category {
  name: string;
  description?: string;
  subcategories?: Subcategory[];
  verses?: Verse[];
}

export interface BibleVerseCheatsheet {
  categories: Category[];
}

export interface Heresy {
  name: string;
  false_teaching: string;
  catholic_truth: string;
}

export interface HeresiesChecklist {
  heresies: Heresy[];
  catholic_teachings_about_jesus: string[];
} 