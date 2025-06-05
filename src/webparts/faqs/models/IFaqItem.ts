export interface IFaqItem {
  Id: number;
  Title: string; // The question
  Answer: string; // The answer
  HelpWord: string; // Words that will show tooltip
  Explain: string; // Explanation for the help word
}

export interface IFaqState {
  faqItems: IFaqItem[];
  filteredItems: IFaqItem[];
  searchQuery: string;
  loading: boolean;
  error: string;
  expandedItems: { [key: number]: boolean };
  currentPage: number;
  itemsPerPage: number;
}
