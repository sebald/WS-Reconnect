// import { WebSocketSubject, WebSocketSubjectConfig } from '@reactivex/rxjs/src/observable/dom/WebSocketSubject';
// import { Observable } from '@reactivex/rxjs/src/Observable';
// import '@reactivex/rxjs/src/add/observable/fromEvent';
// import '@reactivex/rxjs/src/add/observable/interval';
// import '@reactivex/rxjs/src/add/observable/timer';
// import '@reactivex/rxjs/src/add/operator/pluck';
// import '@reactivex/rxjs/src/add/operator/mergeMap';
// import '@reactivex/rxjs/src/add/operator/retryWhen';
// import '@reactivex/rxjs/src/add/operator/take';

import * as Rx from './node_modules/@reactivex/rxjs/src/Rx';
import { WebSocketSubject } from './node_modules/@reactivex/rxjs/src/observable/dom/WebSocketSubject';

interface Message {
    text:string;
}


const RETRY_DELAY = 200;
const url = 'ws://localhost:4000';

const socket$ = new WebSocketSubject<Message>(url);

socket$
    .retryWhen(errors => errors.mergeMap(error => {
        if (window.navigator.onLine) {
            console.warn(`Retrying in ${RETRY_DELAY}ms.`);
            return Rx.Observable.timer(RETRY_DELAY);
        } else {
            return Rx.Observable.fromEvent(window, 'online').take(1);
        }
    }))
    .pluck('text')
    .subscribe(txt => console.log(txt));


// Observable.interval(1000)
//     .subscribe(n => socket$.socket.send(JSON.stringify({ text: n+'' })));
(() => {
    document.getElementById('send').addEventListener('click', () => socket$.socket.send(JSON.stringify({ text: 'foo' })));
})();