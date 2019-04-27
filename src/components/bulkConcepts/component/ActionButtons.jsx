import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import PreviewCard from './PreviewCard';

export class ActionButtons extends Component {
  static propTypes = {
    previewConcept: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      type: PropTypes.string,
      typeName: PropTypes.string,
      collectionName: PropTypes.string,
    }).isRequired,
    preview: PropTypes.shape({
      url: PropTypes.string,
      display_name: PropTypes.string,
    }).isRequired,
    addConcept: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalId: PropTypes.string.isRequired,
    mappings: PropTypes.array,
    singleConcept: PropTypes.array,

  };

  constructor(props) {
    super(props);
    this.state = {
      disableButton: false,
    };
  }

  fetchPreview = (id) => {
    const { previewConcept, openModal } = this.props;
    previewConcept(id);
    openModal(id);
  };

  addConcept = (conceptUrl, name) => {
    const { params } = this.props;
    const data = { data: { expressions: [conceptUrl] } };
    if (this.props.mappings && this.props.mappings.length > 0) {
      this.props.addConcept(params, data, name);
      const conceptUrls = this.props.mappings.map(concept => concept.to_concept_url);
      const newData = { data: { expressions: conceptUrls } };
      if (this.props.singleConcept.mappings && this.props.singleConcept.mappings.length > 0) {
        const secondLevelConceptUrls = this.props.singleConcept.mappings.map(
          concept => concept.to_concept_url,
        );
        const newMapData = { data: { expressions: secondLevelConceptUrls } };
        this.props.addConcept(params, newMapData, name, secondLevelConceptUrls);
      } else {
        this.props.addConcept(params, newData, name, conceptUrls);
      }
    } else {
      this.props.addConcept(params, data, name);
    }
  };

  addConceptButton = (id, url, display_name) => {
    this.setState({ disableButton: true });
    const { closeModal } = this.props;
    notify.show('Adding...', 'warning', 800);
    this.fetchPreview(id);
    closeModal();
    setTimeout(() => {
      this.addConcept(url, display_name);
    }, 1000);
  };

  render() {
    const { disableButton } = this.state;
    const {
      id, url, display_name, modalId, closeModal, preview,
    } = this.props;
    return (
      <React.Fragment>
        <button
          type="submit"
          className="btn btn-sm mb-1 actionaButtons"
          id="add-button"
          onClick={() => this.addConceptButton(
            id,
            url,
            display_name,
          )
          }
          disabled={disableButton}
        >
          Add concept
        </button>
        <div
          className="d-inline"
          id="preview"
          onClick={() => this.fetchPreview(this.props.id)}
          role="presentation"
        >
          <button type="button" className="btn btn-sm mb-1 actionaButtons">
            Preview concept
            <PreviewCard
              open={modalId === id}
              concept={preview}
              addConcept={this.addConcept}
              closeModal={closeModal}
            />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

ActionButtons.defaultProps = {
  mappings: null,
  singleConcept: [],
};

export default ActionButtons;
