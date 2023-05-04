import { createFeatureSelector } from "@ngrx/store";
import { ExercisesState } from "./exercises";

export const exercisesFeatureKey = 'exercises';
export const getExerciseState = createFeatureSelector<ExercisesState>(exercisesFeatureKey);