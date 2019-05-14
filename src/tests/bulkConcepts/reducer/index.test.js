import deepFreeze from 'deep-freeze';
import reducer from '../../../redux/reducers/bulkConceptReducer';
import {
  FETCH_BULK_CONCEPTS,
  ADD_TO_DATATYPE_LIST,
  ADD_TO_CLASS_LIST,
  FETCH_FILTERED_CONCEPTS,
  PREVIEW_CONCEPT,
  SET_CURRENT_PAGE,
  SET_NEXT_PAGE,
  SET_PERVIOUS_PAGE,
  GET_SINGLE_CIEL_CONCEPT,
  GET_RECURSIVE_CIEL_CONCEPT,
} from '../../../redux/actions/types';
import concepts, { concept2, concept4, multipleConceptsMockStore } from '../../__mocks__/concepts';
import { classes as classList, DATA_TYPES as dataTypesList } from '../../../components/dictionaryConcepts/components/helperFunction';

let state;
let action;

beforeEach(() => {
  state = {
    bulkConcepts: [],
    datatypes: [],
    classes: [],
    datatypeList: [],
    classList: [],
    currentPage: 1,
    singleConcept: [],
    recursiveConcept: [],
  };
  action = {};
});

describe('Test suite for bulkConcepts reducer', () => {
  it('should not change state if no action passed', () => {
    expect(reducer(state, action)).toBe(state);
  });

  it('should handle FETCH_BULK_CONCEPTS', () => {
    action = {
      type: FETCH_BULK_CONCEPTS,
      payload: [concepts, concept2],
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      classes: classList,
      datatypes: dataTypesList,
      bulkConcepts: action.payload,
    });
  });
  it('should handle SET_NEXT_PAGE', () => {
    action = {
      type: SET_NEXT_PAGE,
      payload: 1,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      currentPage: action.payload + 1,
    });
  });
  it('should handle SET_PERVIOUS_PAGE', () => {
    action = {
      type: SET_PERVIOUS_PAGE,
      payload: 1,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      currentPage: action.payload - 1,
    });
  });
  it('should handle SET_CURRENT_PAGE', () => {
    action = {
      type: SET_CURRENT_PAGE,
      payload: 1,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      currentPage: action.payload,
    });
  });
  it('should handle ADD_TO_DATATYPE_LIST', () => {
    action = {
      type: ADD_TO_DATATYPE_LIST,
      payload: 'Text',
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      datatypeList: ['Text'],
    });
  });
  it('should handle ADD_TO_CLASS_LIST', () => {
    action = {
      type: ADD_TO_CLASS_LIST,
      payload: 'Diagnosis',
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      classList: ['Diagnosis'],
    });
  });
  it('should handle FETCH_FILTERED_CONCEPTS', () => {
    action = {
      type: FETCH_FILTERED_CONCEPTS,
      payload: [multipleConceptsMockStore],
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      bulkConcepts: action.payload,
      classes: classList,
      datatypes: dataTypesList,
    });
  });
  it('should handle PREVIEW_CONCEPT', () => {
    action = {
      type: PREVIEW_CONCEPT,
      payload: [concepts],
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      preview: action.payload,
    });
  });
  it('should handle GET_SINGE_CIEL_CONCEPT', () => {
    action = {
      type: GET_SINGLE_CIEL_CONCEPT,
      payload: concept4,
    };
    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      singleConcept: [action.payload],
    });
  });
  it('should handle GET_RECURSIVE_CIEL_CONCEPT', () => {
    action = {
      type: GET_RECURSIVE_CIEL_CONCEPT,
      payload: concept4,
    };
    deepFreeze(state);
    deepFreeze(action);

    expect(reducer(state, action)).toEqual({
      ...state,
      recursiveConcept: [action.payload],
    });
  });
});
