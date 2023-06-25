export function paginate(size: number, number: number): { skip: number, take: number } {
    return {
        take: number,
        skip: (number - 1) * size
    }
}