import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IFaqItem } from '../models/IFaqItem';

export class SharePointService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async getFaqItems(listTitle: string): Promise<IFaqItem[]> {
    if (!listTitle) {
      return [];
    }

    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$select=Id,Title,Answer,HelpWord,Explain&$orderby=Title`,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const data = await response.json();
        return data.value as IFaqItem[];
      } else {
        console.error('Error fetching FAQ items:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error in getFaqItems:', error);
      throw new Error(`Failed to fetch FAQ items: ${error.message}`);
    }
  }

  public async getAvailableLists(): Promise<{ Title: string; Id: string }[]> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$select=Title,Id&$filter=Hidden eq false and BaseTemplate eq 100`,
        SPHttpClient.configurations.v1
      );      if (response.ok) {
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.value.map((list: any) => ({
          Title: list.Title,
          Id: list.Id
        }));
      } else {
        console.error('Error fetching lists:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error in getAvailableLists:', error);
      return [];
    }
  }
}
