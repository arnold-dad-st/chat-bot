import { injectable } from '@servicetitan/react-ioc';
import { action, makeObservable, observable } from 'mobx';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

const draft = [
    {isUser: false, time: '12:45', message: 'Hi, welcome to SimpleChat! Go ahead and send me a message. 😄'},
    {isUser: true, time: '12:46', message: 'You can change your name in JS section!'}
]

@injectable()
export class WidgetStore {
    @observable open = true;
    @observable loading: any;
    @observable userInputText = ''
    @observable messages: any[] = draft;

    constructor() {
        makeObservable(this);

        setInterval(() => {
            // this.handleNewMessage()
        }, 1000)
    }

    @action setLoading = (loading: any) => (this.loading = loading);

    @action setDrawerOpen = () => (this.open = true);

    @action setDrawerClose = () => (this.open = false);


    init = () => {};

    @action handleInputChange = (event:any) => {
        this.userInputText = event.target.value;
    }

    @action handleInputSubmit = () => {
        this.loading = true;

        const newMsg =  {
            isUser: true,
            time: '12:13',
            message: this.userInputText
        }

        this.messages.push(newMsg)

        this.userInputText = ''

        setTimeout(() => {
            this.handleDummyInsert()
            this.loading = false;
        },1500)
    }

    @action handleNewMessage = () => {
        const newMsg =  {
            isUser: chance.bool(),
            time: '12:13',
            message: chance.sentence({ words: 5 })
        }

        this.messages.push(newMsg)
    }

    @action handleDummyInsert = () => {
        const newMsg =  {
            isUser: false,
            time: '12:13',
            message: chance.sentence({ words: 5 })
        }

        this.messages.push(newMsg)
    }
}
