export interface CurrencyPriceResponse {
    motd: {
        msg: string,
        url: string,
    },
    success: boolean,
    base: string,
    date: string,
    rates: Record<string, number>;
}