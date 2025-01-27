//#region Imports
import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import IChangingPhaseViewProps from './IChangingPhaseViewProps';
import IChangingPhaseViewState from './IChangingPhaseViewState';
import * as strings from 'ProjectWebPartsStrings';
import * as format from 'string-format';
//#endregion

/**
 * @component ChangingPhaseView
 */
export default class ChangingPhaseView extends React.Component<IChangingPhaseViewProps, IChangingPhaseViewState> {
    public static displayName = 'ChangingPhaseView';

    /**
     * Constructor
     *
     * @param {IChangingPhaseViewProps} props Props
     */
    constructor(props: IChangingPhaseViewProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <ProgressIndicator label={strings.PleaseWaitText} description={format(strings.ChangingPhaseDescription, this.props.newPhase.name)} />
        );
    }
}
