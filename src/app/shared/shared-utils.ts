/* eslint-disable prefer-arrow/prefer-arrow-functions */
export function generatedRandomString(length) {
  const characters ='0123456789ABCDEFG';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
