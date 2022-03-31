import squareArea from './square';
import circleArea from './circle';
import { compact } from 'lodash-es';
console.log('Area of square: ', squareArea(5));
console.log('Area of circle', circleArea(5));
console.log(compact(0, 1, undefined, null, false));
