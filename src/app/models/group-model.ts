import { Word } from './word-model';

export interface Group {
  name: string;
  topic?: string;
  seqNo: number;
  averageProficiency: number;
  groupNum: string;
}
