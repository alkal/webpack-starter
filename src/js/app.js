import 'jquery';
import '../css/main.scss';
import '../css/custom.css';
import './console-message';
import {RandomGenerator} from './random-generator';

const outputParagraph = $('#outputParagraph');

const outputRandomInt = () => {
    outputParagraph.text(RandomGenerator.randomInteger());
};

const outputRandomRange = () => {
    outputParagraph.text(RandomGenerator.randomRange(1, 500));
};

const buttonRndInt = jQuery('#randomInt');
const buttonRndRange = $('#randomRange');

buttonRndInt.click(outputRandomInt);
buttonRndRange.click(outputRandomRange);
>>>>>>> Webpack setup for pure HTML-CSS-SASS-JS project
