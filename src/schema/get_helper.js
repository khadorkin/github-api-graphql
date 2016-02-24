import restler from "restler";

export function getFromURL(url) {
  return new Promise((resolve, reject) => {
    restler.get(url.replace(/{[^}]*}/,'')).on("complete", (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

export function getFromURLWithAuth(url, accessToken) {
  console.log(`getFromURLWithAuth(${url},${accessToken})`);
  return new Promise((resolve, reject) => {
    restler.get(url.replace(/{[^}]*}/,''), {
      headers: { "Authorization": `Bearer: ${accessToken}`}
      }).on("complete", (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

