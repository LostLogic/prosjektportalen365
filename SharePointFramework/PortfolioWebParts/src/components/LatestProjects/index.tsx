import { DisplayMode } from '@microsoft/sp-core-library';
import { SortDirection } from '@pnp/sp';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { formatDate } from 'shared/lib/helpers';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import * as PortfolioWebPartsStrings from 'PortfolioWebPartsStrings';
import * as React from 'react';
import { ILatestProjectsProps } from './ILatestProjectsProps';
import { ILatestProjectsState } from './ILatestProjectsState';
import styles from './LatestProjects.module.scss';


export class LatestProjects extends React.Component<ILatestProjectsProps, ILatestProjectsState> {
  constructor(props: ILatestProjectsProps) {
    super(props);
    this.state = { isLoading: true, projects: [], showList: true };
  }

  public async componentDidMount() {
    try {
      const projects = await this.props.dataAdapter.fetchProjectSites(this.props.rowLimit, 'Created', SortDirection.Descending);
      this.setState({ projects, isLoading: false });
    } catch (error) {
      this.setState({ projects: [], isLoading: false });
    }
  }

  /**
   * Renders the <LatestProjects /> component
   */
  public render(): React.ReactElement<ILatestProjectsProps> {
    return (
      <div className={styles.latestProjects}>
        <WebPartTitle
          displayMode={DisplayMode.Read}
          title={this.props.title}
          updateProperty={_ => { }} />
        <div className={styles.container}>
          {this.state.isLoading
            ? <Spinner label={this.props.loadingText} type={SpinnerType.large} />
            : this._renderProjectList()
          }
        </div>
      </div>
    );
  }

  /**
   * Render project list
   */
  private _renderProjectList() {
    if (this.state.projects.length === 0) return <MessageBar>{this.props.emptyMessage}</MessageBar>;
    return this.state.projects.map(site => {
      let created = formatDate(site.Created);
      return (
        <div className={styles.projectItem}>
          <div className={styles.itemContainer}>
            <div className={styles.created}>
              {PortfolioWebPartsStrings.CreatedText} {created}
            </div>
            <a href={site.Path}>{site.Title}</a>
          </div>
        </div>
      );
    });
  }
}

export { ILatestProjectsProps };

