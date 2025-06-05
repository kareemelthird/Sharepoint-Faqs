import * as React from 'react';
import styles from './FaqItem.module.scss';
import { IFaqItem } from '../models/IFaqItem';

export interface IFaqItemProps {
  item: IFaqItem;
  isExpanded: boolean;
  onToggle: () => void;
  searchQuery: string;
}

const FaqItem: React.FC<IFaqItemProps> = ({ item, isExpanded, onToggle, searchQuery }): JSX.Element => {
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const startIndex = lowerText.indexOf(lowerQuery);
    
    if (startIndex === -1) return text;
    
    const beforeMatch = text.substring(0, startIndex);
    const match = text.substring(startIndex, startIndex + query.length);
    const afterMatch = text.substring(startIndex + query.length);
    
    return (
      <>
        {beforeMatch}
        <span className={styles.highlight}>{match}</span>
        {highlightText(afterMatch, query)}
      </>
    );
  };
  const renderAnswerWithTooltip = (answer: string, helpWord: string, explain: string): React.ReactNode => {
    if (!helpWord) return highlightText(answer, searchQuery);
      const helpWords = helpWord.split(',').map(word => word.trim()).filter(word => word.length > 0);
    if (helpWords.length === 0) return highlightText(answer, searchQuery);
    
    const parts: React.ReactNode[] = [];
    let remainingText = answer;
    let currentIndex = 0;
    
    while (remainingText.length > 0) {
      let earliestMatch = { word: '', index: -1, actualWord: '' };
      
      // Find the earliest occurrence of any help word
      helpWords.forEach(word => {
        const lowerRemaining = remainingText.toLowerCase();
        const wordIndex = lowerRemaining.indexOf(word.toLowerCase());
        if (wordIndex !== -1 && (earliestMatch.index === -1 || wordIndex < earliestMatch.index)) {
          earliestMatch = { 
            word, 
            index: wordIndex, 
            actualWord: remainingText.substring(wordIndex, wordIndex + word.length) 
          };
        }
      });
      
      if (earliestMatch.index !== -1) {
        // Add text before the match
        if (earliestMatch.index > 0) {
          const beforeMatch = remainingText.substring(0, earliestMatch.index);
          parts.push(highlightText(beforeMatch, searchQuery));
        }        // Add the help word with tooltip
        parts.push(
          <span 
            key={`tooltip-${currentIndex}`}
            className={styles.helpWord} 
            title={explain}
          >
            {highlightText(earliestMatch.actualWord, searchQuery)}
          </span>
        );
        
        // Continue with remaining text
        remainingText = remainingText.substring(earliestMatch.index + earliestMatch.word.length);
        currentIndex++;
      } else {
        // No more matches, add remaining text
        parts.push(highlightText(remainingText, searchQuery));
        break;
      }
    }
    
    return <>{parts}</>;
  };

  return (
    <div className={styles.faqItem}>
      <button 
        className={styles.questionButton}
        onClick={onToggle}
        type="button"
        aria-expanded={isExpanded}
      >
        <div className={styles.questionContent}>
          <h3 className={styles.questionTitle}>
            {highlightText(item.Title, searchQuery)}
          </h3>
          <div className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.207 5.793a1 1 0 0 1 0 1.414L8.707 10.707a1 1 0 0 1-1.414 0L3.793 7.207a1 1 0 1 1 1.414-1.414L8 8.586l2.793-2.793a1 1 0 0 1 1.414 0z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </button>
      
      <div className={`${styles.answerContainer} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.answerContent}>
          <p className={styles.answerText}>
            {renderAnswerWithTooltip(item.Answer, item.HelpWord, item.Explain)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;