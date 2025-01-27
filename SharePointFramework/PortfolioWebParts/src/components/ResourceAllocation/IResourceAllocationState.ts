import { ITimelineData } from 'interfaces';

export interface IResourceAllocationState {
    /**
     * Whether the component is loading
     */
    isLoading: boolean;

    /**
     * Show filter panel
     */
    showFilterPanel: boolean;

    /**
     * Active filters
     */
    activeFilters: {[key: string]: string[] };

    /**
     * Data
     */
    data?: ITimelineData;

    /**
     * Error
     */
    error?: string;
}