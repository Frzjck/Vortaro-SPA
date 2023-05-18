import { Observable, OperatorFunction, iif, defer, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

type ConditionFunction<T, R> = (value: T) => boolean;
type CaseFunction<T, R> = (value: T) => Observable<R>;

export function switchCase<T, R>(
    ...cases: [ConditionFunction<T, boolean>, CaseFunction<T, R>][]
): OperatorFunction<T, R> {
    return (source: Observable<T>): Observable<R> => {
        return source.pipe(
            switchMap((value: T) => {
                const matchedCase = cases.find(([condition]) => condition(value));
                if (matchedCase) {
                    const [, caseFn] = matchedCase;
                    return defer(() => caseFn(value));
                }
                return from([]);
            })
        );
    };
}

// Implementation example:
// const source$ = of(2, 3, 4, 5, 6);

// const result$ = source$.pipe(
//   switchCase(
//     [(value: number) => value === 2, () => of('two')],
//     [(value: number) => value === 3, () => of('three')],
//     [(value: number) => value === 4, () => of('four')],
//     [(value: number) => value === 5, () => of('five')],
//     [(value: number) => value === 6, () => of('six')]
//   )
// );


// this.store.select(getParams).pipe(
//     switchCase(
//       [(params) => params.exerciseType === "group", (params) => this.store.select(getWordsByGroupId(params.groupId))],
//       [(params) => params.exerciseType === "mistakes", () => this.store.select(getWorstWords)],
//       [(params) => params.exerciseType === "random", () => this.store.select(getRandomWords(Math.random()))],
//     )
//   )
