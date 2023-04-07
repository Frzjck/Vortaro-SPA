import { Word } from './word-model';
import firebase from "firebase/compat/app";

export interface Group {
  id?: string;
  name: string;
  topic?: string;
  averageProficiency: number;
  shared_with?: string[];
  date: firebase.firestore.Timestamp;
}
