export const getLineEndDate = (price: string, increment: string, startDate: string) => {
    let days = Math.round(parseFloat(price) / parseFloat(increment));
    var result = new Date(startDate);
    result.setDate(result.getDate() + days);

    if (isNaN(result.getDay())) {
        return "Please complete all fields to see result";
    }

    return result.toLocaleDateString("en-US");
}
