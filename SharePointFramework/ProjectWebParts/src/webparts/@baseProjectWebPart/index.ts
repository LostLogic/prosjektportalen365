import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ConsoleListener, Logger, LogLevel } from '@pnp/logging';
import '@pnp/polyfill-ie11';
import { sp } from '@pnp/sp';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ApplicationInsightsLogListener } from 'shared/lib/logging';
import HubSiteService, { IHubSite } from 'sp-hubsite-service';
import { IBaseWebPartComponentProps } from '../../components/BaseWebPartComponent';
import SPDataAdapter from '../../data';

// tslint:disable-next-line: naming-convention
export abstract class BaseProjectWebPart<T extends IBaseWebPartComponentProps> extends BaseClientSideWebPart<T> {
    private _hubSite: IHubSite;

    public abstract render(): void;

    /**
     * Render component
     * 
     * @param {React.ComponentClass} component Component 
     * @param {T} props Props
     */
    public renderComponent(component: React.ComponentClass<T>, props?: Partial<T>): void {
        let combinedProps: T = {
            ...this.properties,
            ...props,
            title: this.properties.title || this.title,
            hubSite: this._hubSite,
            siteId: this.context.pageContext.site.id.toString(),
            webUrl: this.context.pageContext.web.absoluteUrl,
            webTitle: this.context.pageContext.web.title,
            isSiteAdmin: this.context.pageContext.legacyPageContext.isSiteAdmin,
            displayMode: this.displayMode,
            pageContext: this.context.pageContext,
        };
        const element: React.ReactElement<T> = React.createElement(component, combinedProps);
        ReactDom.render(element, this.domElement);
    }

    /**
     * Setup sp, data adapter, logging etc
     */
    private async _setup() {
        sp.setup({ spfxContext: this.context });
        this._hubSite = await HubSiteService.GetHubSite(sp, this.context.pageContext);
        SPDataAdapter.configure(this.context, {
            siteId: this.context.pageContext.site.id.toString(),
            webUrl: this.context.pageContext.web.absoluteUrl,
            hubSiteUrl: this._hubSite.url,
            logLevel: (sessionStorage.DEBUG || DEBUG) ? LogLevel.Info : LogLevel.Warning,
        });
        Logger.subscribe(new ConsoleListener());
        Logger.subscribe(new ApplicationInsightsLogListener(this.context.pageContext));
        Logger.activeLogLevel = (sessionStorage.DEBUG || DEBUG) ? LogLevel.Info : LogLevel.Warning;
    }

    public async onInit(): Promise<void> {
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        await this._setup();
    }
}
