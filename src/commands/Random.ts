import {Command} from '@adonisjs/ace';
import got from 'got';

class Random extends Command {
    static get signature ():string {
        return 'random';
    }

    static get description ():string {
        return "Returns a random fact about a number";
    }

    async handle () {
        const number:number = await this
            .ask('Input a number')
        // check if number is of datatype number
        if(isNaN(number)) {
            throw new Error(`${number} is not a number.`)
        }

        // ensures that number is not a float
        if(number % 1 != 0) {
            throw new Error(`${number} should not be a decimal number`)
        }
        
        const category:string = await this
            .choice('Select a category', [
                'trivia',
                'math',
                'date',
                'year'
            ]);
        
        const url:string = `http://numbersapi.com/${number}/${category}`

        const response = await got(url);

        this.success(`${response.body} - ${this.icon('success')}`);
        process.exit(0)
    }
}

export default Random;
