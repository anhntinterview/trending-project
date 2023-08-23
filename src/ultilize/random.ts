import crypto from 'crypto';
import { characters, cityName, passwordPattern, stateName, streetName, streetNumber, zipCode } from './const';

export function getRandomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getRandomFloat(min: number, max: number, decimals: number) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

export function getRandomParagraph(words: Array<string>) {
  return words[Math.floor(Math.random() * words.length)];
}

export function getSimpleRandom(list: Array<string>) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomElement(array) {
  if (array instanceof Array) return array[Math.floor(Math.random() * array.length)];
  else return array;
}

const template = [streetNumber, ' ', streetName, ', ', cityName, ' ', stateName, ', ', zipCode];
export function getRandomAddress() {
  return template.map(getRandomElement).join('');
}

export function getRandomByte() {
  // http://caniuse.com/#feat=getrandomvalues
  if (crypto && crypto.getRandomValues) {
    var result = new Uint8Array(1);
    crypto.getRandomValues(result);
    return result[0];
  } else {
    return Math.floor(Math.random() * 256);
  }
}

export function getRandomPhoneNumber() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

export function getRandomPostalCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generatePassword() {
  const length = 8;

  return Array.apply(null, { length: length })
    .map(function () {
      var result;
      while (true) {
        result = String.fromCharCode(getRandomByte());
        if (passwordPattern.test(result)) {
          return result;
        }
      }
    }, this)
    .join('');
}

export function getRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'domain.com'];
  const randomUsername = Math.random().toString(36).substring(7);
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${randomUsername}@${randomDomain}`;
  return email;
}