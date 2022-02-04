export const rolldice = (dicecount: number, dicetype: number) => {
    let res = 0;
    for (let i = 0; i < dicecount; i++) {
        const rand = 1 + Math.floor(Math.random() * (dicetype - 1 + 1));
        res += rand;
        console.log(rand, "/", res)
    }
    return res;
}