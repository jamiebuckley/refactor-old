export interface ISpawner<T> {
    give(T) : void;
    take() : T;
    count() : number;
    hasAny() : boolean;
}
