import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFaqsProps {
  listTitle: string;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}
