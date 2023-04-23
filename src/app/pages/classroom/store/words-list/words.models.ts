import { FireWord } from "@app/models/backend/word";
export { FireWord } from "@app/models/backend/word";

export interface Word extends FireWord {
    id: string;
}
