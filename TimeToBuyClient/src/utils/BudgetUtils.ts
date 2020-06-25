export const getLineEndDate = (price: string, increment: string, startDate: string) => {
    let days = Math.round(parseFloat(price) / parseFloat(increment));
    var result = new Date(startDate);
    result.setDate(result.getDate() + days);

    if (isNaN(result.getDay())) {
        return "Please complete all fields to see result";
    }

    return result.toLocaleDateString("en-US");
}

export const genGUID = () => {
    const GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
    console.log(GUID);
    return GUID;
}