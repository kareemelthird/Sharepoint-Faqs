import * as React from 'react';
import styles from './Faqs.module.scss';
import { IFaqsProps } from './IFaqsProps';
import { IFaqItem, IFaqState } from '../models/IFaqItem';
import { SharePointService } from '../services/SharePointService';
import { SearchBox } from './SearchBox';
import FaqItem from './FaqItem';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Faqs extends React.Component<IFaqsProps, IFaqState> {
  private sharePointService: SharePointService;

  constructor(props: IFaqsProps) {
    super(props);
    
    this.sharePointService = new SharePointService(this.props.context);
    
    this.state = {
      faqItems: [],
      filteredItems: [],
      searchQuery: '',
      loading: false,
      error: '',
      expandedItems: {},
      currentPage: 1,
      itemsPerPage: 4
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.loadFaqItems();
  }

  public async componentDidUpdate(prevProps: IFaqsProps): Promise<void> {
    if (prevProps.listTitle !== this.props.listTitle) {
      await this.loadFaqItems();
    }
  }

  private async loadFaqItems(): Promise<void> {
    if (!this.props.listTitle) {
      this.setState({
        faqItems: [],
        filteredItems: [],
        loading: false,
        error: '',
        currentPage: 1
      });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const items = await this.sharePointService.getFaqItems(this.props.listTitle);
      this.setState({
        faqItems: items,
        filteredItems: items,
        loading: false,
        currentPage: 1
      });
    } catch (error) {
      this.setState({
        error: `Error loading FAQ items: ${error.message}`,
        loading: false,
        faqItems: [],
        filteredItems: [],
        currentPage: 1
      });
    }
  }

  private handleSearch = (query: string): void => {
    const trimmedQuery = query.trim();
    const filteredItems = trimmedQuery
      ? this.state.faqItems.filter(item => {
          const titleMatch = item.Title && item.Title.toLowerCase().indexOf(trimmedQuery.toLowerCase()) !== -1;
          const answerMatch = item.Answer && item.Answer.toLowerCase().indexOf(trimmedQuery.toLowerCase()) !== -1;
          const helpWordMatch = item.HelpWord && item.HelpWord.toLowerCase().indexOf(trimmedQuery.toLowerCase()) !== -1;
          const explainMatch = item.Explain && item.Explain.toLowerCase().indexOf(trimmedQuery.toLowerCase()) !== -1;
          
          return titleMatch || answerMatch || helpWordMatch || explainMatch;
        })
      : this.state.faqItems;

    this.setState({
      searchQuery: trimmedQuery,
      filteredItems,
      currentPage: 1
    });
  }

  private toggleExpanded = (itemId: number): void => {
    this.setState(prevState => ({
      expandedItems: {
        ...prevState.expandedItems,
        [itemId]: !prevState.expandedItems[itemId]
      }
    }));
  }

  private handlePageChange = (page: number): void => {
    this.setState({ currentPage: page });
  }

  private getCurrentPageItems = (): IFaqItem[] => {
    const { filteredItems, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }

  private getTotalPages = (): number => {
    const { filteredItems, itemsPerPage } = this.state;
    return Math.ceil(filteredItems.length / itemsPerPage);
  }

  public render(): React.ReactElement<IFaqsProps> {
    const { listTitle, hasTeamsContext } = this.props;
    const { filteredItems, loading, error, searchQuery, expandedItems, currentPage } = this.state;
    
    const currentPageItems = this.getCurrentPageItems();
    const totalPages = this.getTotalPages();
    const startItem = (currentPage - 1) * this.state.itemsPerPage + 1;
    const endItem = Math.min(startItem + currentPageItems.length - 1, filteredItems.length);

    return (
      <section className={`${styles.faqs} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            {listTitle && (
              <p className={styles.subtitle}>
                Showing FAQs from: <strong>{escape(listTitle)}</strong>
              </p>
            )}
          </div>

          {!listTitle && (
            <div className={styles.noListMessage}>
              <div className={styles.noListIcon}>❓</div>
              <h2>No FAQ List Selected</h2>
              <p>Please configure a SharePoint list in the web part properties to display FAQs.</p>
            </div>
          )}

          {listTitle && (
            <>
              <SearchBox
                placeholder="Search questions and answers..."
                onSearch={this.handleSearch}
              />

              {loading && (
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                  <p>Loading FAQs...</p>
                </div>
              )}

              {error && (
                <div className={styles.error}>
                  <div className={styles.errorIcon}>⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && filteredItems.length === 0 && searchQuery && (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or browse all questions.</p>
                </div>
              )}

              {!loading && !error && filteredItems.length === 0 && !searchQuery && listTitle && (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>📝</div>
                  <h3>No FAQs available</h3>
                  <p>The selected list doesn&apos;t contain any FAQ items yet.</p>
                </div>
              )}

              {!loading && !error && filteredItems.length > 0 && (
                <>
                  <div className={styles.faqList}>
                    {currentPageItems.map((item: IFaqItem) => (
                      <FaqItem
                        key={item.Id}
                        item={item}
                        isExpanded={!!expandedItems[item.Id]}
                        onToggle={() => this.toggleExpanded(item.Id)}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className={styles.pagination}>
                      <button
                        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                        onClick={() => this.handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        type="button"
                      >
                        ‹ Previous
                      </button>
                      
                      <div className={styles.pageNumbers}>
                        {(() => {
                          const pages: JSX.Element[] = [];
                          for (let i = 1; i <= totalPages; i++) {
                            pages.push(
                              <button
                                key={i}
                                className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
                                onClick={() => this.handlePageChange(i)}
                                type="button"
                              >
                                {i}
                              </button>
                            );
                          }
                          return pages;
                        })()}
                      </div>

                      <button
                        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                        onClick={() => this.handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        type="button"
                      >
                        Next ›
                      </button>
                    </div>
                  )}

                  <div className={styles.footer}>
                    <p>
                      Showing {startItem}-{endItem} of {filteredItems.length} questions
                      {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    );
  }
}
