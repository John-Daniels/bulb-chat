
export interface ResponsePayload {
        status: "error" | "success",
        message: string,
        data: { [key: string]: any } | null,
}