import {ISpawner} from "../interfaces/ISpawner";

export class WorkerSpawner implements ISpawner<Worker> {

    give(T): void {
    }

    take(): Worker {
        return undefined;
    }

    count(): number {
        return undefined;
    }

    hasAny(): boolean {
        return undefined;
    }

}