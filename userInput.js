import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function getQuery(queryOrModel='query') {
  return new Promise((resolve) => {
    rl.question( `Enter your ${queryOrModel}:`, (query) => {
      resolve(query);
    });
  });
}

export function getImagePath() {
  return new Promise((resolve) => {
    rl.question('Enter the path to your image: ', (imagePath) => {
      resolve(imagePath);
    });
  });
}

export function close() {
  rl.close();
}