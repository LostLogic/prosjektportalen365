import { DisplayMode } from '@microsoft/sp-core-library';
import { LogLevel } from '@pnp/logging';
import { IHubSite } from 'sp-hubsite-service';

export interface IBaseWebPartComponentProps {
    /**
     * Title of the web part
     */
    title?: string;

    /**
     * Hub site
     */
    hubSite: IHubSite;

    /**
     * ID of the site
     */
    siteId: string;

    /**
     * URL for the web
     */
    webUrl: string;

    /**
     * Title for the web
     */
    webTitle?: string;

    /**
     * Is the current user site admin
     */

    isSiteAdmin?: boolean;

    /**
     * Display mode
     */
    displayMode?: DisplayMode;
}