import { Injectable } from '@angular/core';
import { Word } from '../models/word-model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordManageService {
  BACKEND_URL = "environment.apiUrl";
  getAllWordsUrl = "this.BACKEND_URL + '/words'";

  exerciseType: string;

  private wordsObs = new ReplaySubject<Word[]>(1);
  private words: Word[];

  constructor(private router: Router, private http: HttpClient) { }

  getWordsFromServer() {
    return this.http
      .get<{ message: string; data: any }>(this.getAllWordsUrl)
      .pipe(
        map((res: { message: string; data: any }) => {
          return res.data.map((word): Word => {
            return {
              id: word._id,
              name: word.name,
              translation: word.translation,
              user: word.user,
              tips: word.tips,
              additionalTr: word.additionalTr,
              proficiency: word.proficiency,
              groupNum: word.group,
            };
          });
        })
      )
      .subscribe((transformedPostData) => {
        this.words = transformedPostData;
        this.wordsObs.next([...this.words]);
      });
  }

  wordsObsListener() {
    return this.wordsObs.asObservable();
  }

  getAllWords() {
    return [...this.words];
  }

  // Returning different word sets depending on the exercise type selected
  // ['translate-excercise', 'random', 'work-on-mistakes'];
  getRightWords(typeParam: string, groupIdParam: string) {
    // Depending on Type we feed diferent word arrays
    if (typeParam === 'word-group') {
      const words = this.words.filter((word) => word.groupNum === groupIdParam);
      return this.shuffle(words);
    } else if (typeParam === 'random') {
      // Return random 5 words to exercises
      const words = this.shuffle(this.words).slice(0, 15);
      return this.shuffle(words);
    } else if (typeParam === 'work-on-mistakes') {
      //Sort array and get 5 worst
      const words = this.words
        .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
        .slice(0, 15);
      return this.shuffle(words);
    }
  }

  editOrCreate(name, translation, tips?, groupNum?, wordId?, additionalTr?) {
    if (groupNum) {
      const newWord = {
        name,
        translation,
        tips,
        additionalTr,
      };
      return this.http.post(
        this.BACKEND_URL + '/groups/' + groupNum + '/words',
        newWord
      );
    } else {
      const editedWord = {
        name,
        translation,
        tips,
        additionalTr,
      };
      return this.http.put(this.BACKEND_URL + '/words/' + wordId, editedWord);
    }
  }

  deleteWord(id) {
    return this.http.delete(this.BACKEND_URL + '/words/' + id);
  }

  // Shuffle array and return a reordered one
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}
