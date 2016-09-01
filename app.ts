import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/take';

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
            return Observable.timer(RETRY_DELAY);
        } else {
            return Observable.fromEvent(window, 'online').take(1);
        }
    }))
    .pluck('text')
    .subscribe(txt => console.log(txt));


Observable.interval(1000)
    .subscribe(n => socket$.socket.send(JSON.stringify({ text: n+'' })));