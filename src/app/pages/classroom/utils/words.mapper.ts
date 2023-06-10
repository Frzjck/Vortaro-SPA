import firebase from "firebase/compat/app";
import { Word } from "../store/words-list";
import { FormWord } from "../glossary/components/word-grid/components/word-form/models";
import { FireWordCreateRequest, FireWordUpdateRequest } from "@app/models/backend/word";


export const formWordToNewFireWord = (word: FormWord): FireWordCreateRequest => ({
    ...word,
    created: firebase.firestore.FieldValue.serverTimestamp(),
});
