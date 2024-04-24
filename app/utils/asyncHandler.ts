type AsyncFunction = () => Promise<any>;
type ErrorHandler = (func: AsyncFunction) => Promise<any>

export const asyncHandler: ErrorHandler = async (fn) => {
    try {
        await fn()
    } catch (error) {
        console.log(error)
    }
}