export interface ToDo {
    _id: string | number,
    description: string,
    done: boolean,
    createdAt: string,
    updatedAt: string,
    diffDate?: string | number
}
