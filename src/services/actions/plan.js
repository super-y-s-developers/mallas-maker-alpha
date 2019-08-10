import { FETCH_DATA, FETCH_STUDENTS, SELECT_SUBJECT } from 'services/actions/types';
import { databaseRef, studentsRef } from 'services/firebase';

const uid = "sebas";

// Interact with firebase database
export const fetchData = () => async dispatch => {
  // fetch('data/base.json').then(res => res.json()).then(data => console.log(data))

  databaseRef.on('value', snapshot => {
    const { subjects, subjectTypes, careers, students } = snapshot.val();
    dispatch({ type: FETCH_DATA, payload: { subjects, subjectTypes, careers } });
    dispatch({ type: FETCH_STUDENTS, payload: students });
  });
}

export const reorderPlanSubject = (source, destination, subjectId) => async dispatch => {
  const newSource = Array.from(source.data).filter(e => e !== undefined);
  const newDestination = Array.from(destination.data).filter(e => e !== undefined);

  if(source.id === destination.id) {
    newDestination.splice(source.index, 1);
    newDestination.splice(destination.index, 0, subjectId);

    studentsRef.child(`${uid}/plan/${destination.id}`).set(newDestination);
  } else {
    newSource.splice(source.index, 1);
    newDestination.splice(destination.index, 0, subjectId);

    studentsRef.child(`${uid}/plan/${source.id}`).set(newSource);
    studentsRef.child(`${uid}/plan/${destination.id}`).set(newDestination);
  }
}

export const addPlanSemester = (semester) => async dispatch => {
  studentsRef.child(`${uid}/plan`).once('value', snapshot => {
    const ids = Object.keys(snapshot.val());
    const [lastYear, lastSemester] = ids[ids.length - 1].split('-');
    const newId = lastSemester === 'I' ? `${lastYear}-II` : `${parseInt(lastYear)+1}-I`;

    studentsRef.child(`${uid}/plan`).child(newId).set({ ...semester });
  });
}

export const removePlanSemester = (semesterId) => async dispatch => {
  studentsRef.child(`${uid}/plan/${semesterId}`).set(null);
}

export const removeSubjectFromSemester = (semesterId, subjectIndex) => async dispatch => {
  studentsRef.child(`${uid}/plan/${semesterId}`).once('value', (snapshot) => {
    const newSemester = Array.from(snapshot.val()).filter(e => e !== null);

    newSemester.splice(subjectIndex, 1);

    studentsRef.child(`${uid}/plan/${semesterId}`).set(newSemester);
  });
}

export const addSubjectToSemester = (semesterId, subjectId) => async dispatch => {
  studentsRef.child(`${uid}/plan/${semesterId}`).once('value', (snapshot) => {
    const newSemester = Array.from(snapshot.val()).filter(e => e !== null);

    // TODO: handle subjectId non existence error
    newSemester.push(subjectId);

    studentsRef.child(`${uid}/plan/${semesterId}`).set(newSemester);
  });
}


// Interact with local state
export const selectSubject = (subjectId, prerequisites) => async dispatch => {
  if(!prerequisites) prerequisites = []
  dispatch({ type: SELECT_SUBJECT, payload: { subjectId, prerequisites } })
}

export const deselectSubject = () => async dispatch => {
  dispatch({ type: SELECT_SUBJECT, payload: { subjectId: null, prerequisites: [] } })
}
