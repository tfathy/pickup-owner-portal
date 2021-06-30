
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
import { Storage } from '@capacitor/storage';


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function readStorage(key: string): Promise<any> {
  const item = await Storage.get({ key });
  return JSON.parse(item.value);
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
