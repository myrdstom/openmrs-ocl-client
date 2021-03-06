import reducer from '../../../redux/reducers/ConceptReducers';
import {
  FETCH_CONCEPTS,
  IS_FETCHING,
  SEARCH_CONCEPTS,
  CLEAR_CONCEPTS,
  ADD_SELECTED_ANSWERS,
  ADD_NEW_ANSWER_ROW,
  REMOVE_SELECTED_ANSWER,
  PRE_POPULATE_ANSWERS,
  UNPOPULATE_PRE_POPULATED_ANSWERS,
} from '../../../redux/actions/types';
import concepts from '../../__mocks__/concepts';

const initialState = {
  concepts: [],
  loading: false,
  dictionaryConcepts: [],
  filteredSources: [],
  filteredClass: [],
  filteredList: [],
  filteredByClass: [],
  filteredBySource: [],
  sourceList: [],
  classList: [],
  hasMore: false,
  newName: [],
  description: [],
  newConcept: {},
  addConceptToDictionary: [],
  paginatedConcepts: [],
  totalConceptCount: 0,
  existingConcept: {
    descriptions: [],
    names: [],
  },
  selectedAnswers: [{
    frontEndUniqueKey: 'intialKey',
  }],
};
describe('Test suite for concepts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key concepts to list of concepts and hasMore to false on dispatching actiontype FETCH_CONCEPTS',
    () => {
      expect(reducer(
        { concepts: [] },
        {
          type: FETCH_CONCEPTS,
          payload: [concepts],
        },
      )).toEqual({
        concepts: [concepts],
        hasMore: false,
      });
    },
  );

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key concepts to list of concepts and hasMore to true on dispatching actiontype FETCH_CONCEPTS',
    () => {
      const newConcepts = [{ id: 1 }, { id: 2 },
        { id: 3 }, { id: 4 },
        { id: 5 }, { id: 6 },
        { id: 7 }, { id: 8 },
        { id: 9 }, { id: 10 },
        { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 },
        { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 },
        { id: 19 }, { id: 20 },
        { id: 21 }, { id: 22 },
        { id: 23 }, { id: 24 },
        { id: 25 }];
      expect(reducer(
        { concepts: [] },
        {
          type: FETCH_CONCEPTS,
          payload: newConcepts,
        },
      )).toEqual({
        concepts: newConcepts,
        hasMore: true,
      });
    },
  );

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key concepts to list of concepts and hasMore to true on dispatching actiontype FETCH_CONCEPTS',
    () => {
      const newConcepts = [{ id: 1 }, { id: 2 },
        { id: 3 }, { id: 4 },
        { id: 5 }, { id: 6 },
        { id: 7 }, { id: 8 },
        { id: 9 }, { id: 10 },
        { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 },
        { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 },
        { id: 19 }, { id: 20 },
        { id: 21 }, { id: 22 },
        { id: 23 }, { id: 24 },
        { id: 25 }];
      expect(reducer(
        { concepts: [] },
        {
          type: FETCH_CONCEPTS,
          payload: newConcepts,
        },
      )).toEqual({
        concepts: newConcepts,
        hasMore: true,
      });
    },
  );

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key loading to false on dispatching actiontype IS_FETCHING', () => {
      expect(reducer(
        {},
        {
          type: IS_FETCHING,
          payload: false,
        },
      )).toEqual({
        loading: false,
      });
    },
  );

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key loading and hasMore to false on dispatching actiontype SEARCH_CONCEPTS', () => {
      expect(reducer(
        {},
        {
          type: SEARCH_CONCEPTS,
          payload: false,
        },
      )).toEqual({
        loading: false,
        hasMore: false,
      });
    },
  );

  it(
    // eslint-disable-next-line max-len
    'should handle setting redux state key concepts to list of concepts on dispatching actiontype CLEAR_CONCEPTS', () => {
      expect(reducer(
        { concepts: [] },
        {
          type: CLEAR_CONCEPTS,
          payload: false,
        },
      )).toEqual({
        concepts: [],
      });
    },
  );

  it('should add the selected answers to redux state', () => {
    const payload = { answer: { frontEndUniqueKey: 'intialKey' }, uniqueKey: 'intialKey' };
    const newState = reducer(initialState, { type: ADD_SELECTED_ANSWERS, payload });
    expect(newState.selectedAnswers).toEqual([{ frontEndUniqueKey: 'intialKey' }]);
  });

  it('should prepopulate selected answers array', () => {
    const payload = [{ frontEndUniqueKey: 'newIntialKey' }];
    const newState = reducer(initialState, { type: PRE_POPULATE_ANSWERS, payload });
    expect(newState.selectedAnswers).toEqual([{ frontEndUniqueKey: 'newIntialKey' }]);
  });

  it('should unpopulate selected answers array', () => {
    const payload = [{ frontEndUniqueKey: 'newIntialKey' }];
    const newState = reducer(initialState, { type: UNPOPULATE_PRE_POPULATED_ANSWERS, payload });
    expect(newState.selectedAnswers).toEqual([{ frontEndUniqueKey: 'intialKey' }]);
  });

  it('should add new answer row', () => {
    const payload = { frontEndUniqueKey: 'newIntialKey' };
    const newState = reducer(initialState, { type: ADD_NEW_ANSWER_ROW, payload });
    expect(newState.selectedAnswers).toEqual([{ frontEndUniqueKey: 'intialKey' }, { frontEndUniqueKey: 'newIntialKey' }]);
  });

  it('should remove answer row', () => {
    const payload = 'intialKey';
    const newState = reducer(initialState, { type: REMOVE_SELECTED_ANSWER, payload });
    expect(newState.selectedAnswers).toEqual([{ frontEndUniqueKey: 'newIntialKey' }]);
  });
});
