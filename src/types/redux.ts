import type { ReducersMapObject } from "@reduxjs/toolkit";

export type StateFromReducerMapObject<R> = R extends ReducersMapObject<infer S> ? S : never;
