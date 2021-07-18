/* eslint-disable prefer-arrow/prefer-arrow-functions */

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
import { Storage } from '@capacitor/storage';


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function readStorage(key: string): Promise<any> {
  const item = await Storage.get({ key });
  return JSON.parse(item.value);
}
// generate random text


export function generatedRandomString(length) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




// eslint-disable-next-line @typescript-eslint/naming-convention
export interface authToken {
  userId: string;
  token: string;
  tokenExpirationDate: string;
  email: string;
  fullnameEn: string;
  fullNameAr: string;
  userType: string;
  accountStatus: string;
}
