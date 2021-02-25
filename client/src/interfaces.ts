export interface ToDo {
    _id: string | number,
    description: string,
    done: boolean,
    createdAt: string,
    updatedAt: string,
    diffDate?: string | number
}

export interface MetaParams {
    page: number,
    offset: number,
    limit: number
}

export interface MetaPagination {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    itemCount: number,
    limit: number,
    nextPage: number | null,
    offset: number,
    page: number,
    pageCount: number,
    prevPage: number | null
}
