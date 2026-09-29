export function getResponseNotFound(): Response {
	return new Response(null, { status: 404 });
}

export async function isPasswordCorrect(triedPassword: string, encryptedPassword: string): Promise<Boolean> {
  return await Bun.password.verify(triedPassword, encryptedPassword);
}

export function convertToDatabaseKey(key: string): string {
  let result: string = "";

  for (let i = 0; i < key.length; i++){
    if (key.charCodeAt(i) >= 65 && key.charCodeAt(i) <= 90) {
      result = result + "_" + String.fromCharCode(key.charCodeAt(i) + 32);
    } else {
      result = result + key[i];
    }
  }

  return result;
}
