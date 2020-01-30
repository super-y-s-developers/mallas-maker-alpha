import { combineReducers } from "redux";
import { FETCH_DATA, FETCH_STUDENTS, SELECT_SUBJECT, SET_CURR_USER } from 'services/actions/types';


const currUser = (state = {}, { type, payload }) => {
  switch(type) {
    case SET_CURR_USER: {
      return payload;
    }
    default: return state;
  }
}

const data = (state = {}, { type, payload }) => {
  switch(type) {
    case FETCH_DATA: {
      return payload;
    }
    default: return state;
  }
}

const students = (state = {}, { type, payload }) => {
  switch(type) {
    case FETCH_STUDENTS: {
      return payload;
    }
    default: return state;
  }
}

const selected = (state = { prerequisites: [] }, { type, payload }) => {
  switch(type) {
    case SELECT_SUBJECT: {
      return payload;
    }
    default: return state;
  }
}


export default combineReducers({
  data, students, selected, currUser
});
